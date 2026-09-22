import { useLanguage } from '../i18n/LanguageContext.jsx';
import '../styles/how-to-order.css';

export default function HowToOrder() {
  const { t } = useLanguage();

  const steps = [
    {
      number: '01',
      title: t('howToOrder.steps.choose.title'),
      text: t('howToOrder.steps.choose.text'),
    },
    {
      number: '02',
      title: t('howToOrder.steps.cart.title'),
      text: t('howToOrder.steps.cart.text'),
    },
    {
      number: '03',
      title: t('howToOrder.steps.order.title'),
      text: t('howToOrder.steps.order.text'),
    },
    {
      number: '04',
      title: t('howToOrder.steps.confirm.title'),
      text: t('howToOrder.steps.confirm.text'),
    },
    {
      number: '05',
      title: t('howToOrder.steps.receive.title'),
      text: t('howToOrder.steps.receive.text'),
    },
  ];

  return (
    <main className="prose-page how-to-order-page">
      <div className="how-to-order-page__inner">
        <header className="how-to-order-page__header">
          <p className="how-to-order-page__eyebrow">
            {t('howToOrder.eyebrow')}
          </p>

          <h1>{t('howToOrder.title')}</h1>

          <p className="how-to-order-page__intro">
            {t('howToOrder.intro')}
          </p>
        </header>

        <section className="how-to-order-page__steps">
          {steps.map((step) => (
            <article
              className="how-to-order-page__step"
              key={step.number}
            >
              <div className="how-to-order-page__number">
                {step.number}
              </div>

              <div className="how-to-order-page__content">
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="how-to-order-page__important">
          <h2>{t('howToOrder.important.title')}</h2>
          <p>{t('howToOrder.important.text')}</p>
        </section>

        <p className="how-to-order-page__closing">
          {t('howToOrder.closing')}
        </p>
      </div>
    </main>
  );
}
