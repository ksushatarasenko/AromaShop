import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const STORAGE_KEY = 'aromashop-cart';
const CartContext = createContext(null);

function lineKey(item) {
  return `${item.perfumeId}::${item.purchaseType}::${item.ml}`;
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeItem(item) {
  return {
    perfumeId: item.perfumeId,
    brandId: item.brandId,
    perfumeName: item.perfumeName,
    collection: item.collection || '',
    purchaseType: item.purchaseType,
    ml: Number(item.ml),
    price: Number(item.price),
    quantity: Math.max(1, Number(item.quantity) || 1),
    image: item.image || '',
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCart().map(normalizeItem));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota / private mode */
    }
  }, [items]);

  useEffect(() => {
    if (!toast) return undefined;
    const id = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  const addItem = useCallback((payload) => {
    const incoming = normalizeItem({ ...payload, quantity: payload.quantity ?? 1 });
    const key = lineKey(incoming);

    setItems((prev) => {
      const index = prev.findIndex((item) => lineKey(item) === key);
      if (index === -1) return [...prev, incoming];
      return prev.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + incoming.quantity }
          : item
      );
    });

    setToast({ type: 'added' });
  }, []);

  const removeItem = useCallback((perfumeId, purchaseType, ml) => {
    const key = `${perfumeId}::${purchaseType}::${ml}`;
    setItems((prev) => prev.filter((item) => lineKey(item) !== key));
  }, []);

  const setQuantity = useCallback((perfumeId, purchaseType, ml, quantity) => {
    const key = `${perfumeId}::${purchaseType}::${ml}`;
    const nextQty = Math.max(0, Number(quantity) || 0);
    setItems((prev) => {
      if (nextQty <= 0) {
        return prev.filter((item) => lineKey(item) !== key);
      }
      return prev.map((item) =>
        lineKey(item) === key ? { ...item, quantity: nextQty } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const value = useMemo(() => {
    const itemCount = items.length;
    const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      items,
      itemCount,
      totalUnits,
      total,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      toast,
      dismissToast,
    };
  }, [items, addItem, removeItem, setQuantity, clearCart, toast, dismissToast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}

export { lineKey as cartLineKey };
