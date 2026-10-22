(() => {
  // Fill these public payment instructions only after Algérie Poste confirms your account may receive them.
  const manualBaridi = { recipientName: '', ccp: '', rip: '00799999004030227986', supportContact: '' };
  const copy = {
    en: {
      eyebrow: 'STC LEARNIT MEMBERSHIP', title: 'Choose your way to grow.',
      subtitle: 'More energy, focused learning and direct support when you need it.', close: 'Close plans',
      pro: 'PRO', stc: 'STC', proPrice: '250 DA', stcPrice: '700 DA',
      proFeatures: ['50 Energy', 'No Ads', 'Direct Support'],
      stcFeatures: ['Unlimited AI', 'Unlimited Energy', 'No Ads', 'Admin Support'],
      codePrompt: 'Have a one-month activation code?', codePlaceholder: 'ENTER YOUR PLAN CODE', redeem: 'Redeem code', redeeming: 'Checking code…',
      codeInvalid: 'That code is invalid, expired, or has already been used.', codeLimit: 'Too many attempts. Please wait a few minutes and try again.',
      codeSignIn: 'Sign in before redeeming a plan code.', codeService: 'Code redemption is temporarily unavailable. Please try again later.',
      codeSuccess: plan => `${plan} plan activated until`,
      premiumLabel: 'Premium plans', premiumPrimary: 'Premium', premiumSubscribed: 'Your plan', premiumHover: 'View plans',
      currentPlan: plan => `Your ${plan} plan`, daysLeft: days => `${days} day${days === 1 ? '' : 's'} left`, lessThanDay: 'Less than a day left', ended: 'Your plan has ended', expired: 'Plan end date unavailable',
      choose: 'Choose plan', soon: 'Manual BaridiMob payments are verified by STC before a plan is activated.',
      paymentTitle: plan => `Choose payment method for ${plan}`,
      paymentSetup: 'Choose BaridiMob for manual transfer instructions. STC activates the plan after confirming payment.',
      paymentBaridi: 'BaridiMob manual transfer', paymentBaridiDetail: 'Transfer the plan amount to the STC BaridiMob RIP shown below.',
      paymentVisa: 'Visa', paymentVisaDetail: 'Secure card checkout through an approved bank or payment gateway.',
      setupRequired: 'SETUP REQUIRED',
      manualTitle: 'Pay manually with BaridiMob', manualAmount: price => `Amount to transfer: ${price}`,
      manualRecipient: 'Account holder', manualCcp: 'CCP account', manualRip: 'RIP', manualContact: 'After the transfer, send its transaction reference to',
      manualReceiptNotice: 'Send your payment receipt to this email, or contact us here to buy an activation code:',
      manualVerify: 'STC will verify the transfer in its account history. After confirmation, STC will provide a plan activation code. Never share your BaridiMob password, PIN, or OTP.',
      manualMissing: 'Manual payment details are not set up yet. Contact STC before sending money.',
      visaUnavailable: 'Visa payments are coming soon. We’re sorry for the inconvenience.',
      badge: 'BEST VALUE', energyTitle: 'Out of energy?', energyBody: 'Your energy is used for lessons and Sewingo AI messages. Take a look at the membership plans.'
    },
    fr: {
      eyebrow: 'ABONNEMENTS STC LEARNIT', title: 'Choisissez votre façon de progresser.',
      subtitle: 'Plus d’énergie, un apprentissage ciblé et une aide directe quand vous en avez besoin.', close: 'Fermer les offres',
      pro: 'PRO', stc: 'STC', proPrice: '250 DA', stcPrice: '700 DA',
      proFeatures: ['50 énergies', 'Sans publicité', 'Assistance directe'],
      stcFeatures: ['IA illimitée', 'Énergie illimitée', 'Sans publicité', 'Assistance des administrateurs'],
      codePrompt: 'Vous avez un code d’activation valable un mois ?', codePlaceholder: 'SAISISSEZ VOTRE CODE', redeem: 'Activer le code', redeeming: 'Vérification du code…',
      codeInvalid: 'Ce code est invalide, expiré ou déjà utilisé.', codeLimit: 'Trop de tentatives. Attendez quelques minutes avant de réessayer.',
      codeSignIn: 'Connectez-vous avant d’activer un code.', codeService: 'L’activation des codes est temporairement indisponible. Réessayez plus tard.',
      codeSuccess: plan => `Offre ${plan} activée jusqu’au`,
      premiumLabel: 'Offres Premium', premiumPrimary: 'Premium', premiumSubscribed: 'Votre offre', premiumHover: 'Voir les offres',
      currentPlan: plan => `Votre offre ${plan}`, daysLeft: days => `Encore ${days} jour${days === 1 ? '' : 's'}`, lessThanDay: 'Moins d’un jour restant', ended: 'Votre offre a expiré', expired: 'Date de fin indisponible',
      choose: 'Choisir l’offre', soon: 'Les paiements BaridiMob manuels sont vérifiés par STC avant l’activation de l’offre.',
      paymentTitle: plan => `Choisissez un moyen de paiement pour ${plan}`,
      paymentSetup: 'Choisissez BaridiMob pour les instructions de transfert manuel. STC active l’offre après confirmation du paiement.',
      paymentBaridi: 'Virement manuel BaridiMob', paymentBaridiDetail: 'Transférez le montant de l’offre vers le RIP BaridiMob STC affiché ci-dessous.',
      paymentVisa: 'Visa', paymentVisaDetail: 'Paiement sécurisé par carte via une banque ou une passerelle agréée.',
      setupRequired: 'CONFIGURATION REQUISE',
      manualTitle: 'Payer manuellement avec BaridiMob', manualAmount: price => `Montant à transférer : ${price}`,
      manualRecipient: 'Titulaire du compte', manualCcp: 'Compte CCP', manualRip: 'RIP', manualContact: 'Après le transfert, envoyez sa référence de transaction à',
      manualReceiptNotice: 'Envoyez votre reçu de paiement à cette adresse ou contactez-nous ici pour acheter un code d’activation :',
      manualVerify: 'STC vérifiera le virement dans son historique. Après confirmation, STC fournira un code d’activation. Ne partagez jamais votre mot de passe BaridiMob, votre code PIN ou votre OTP.',
      manualMissing: 'Les informations de paiement manuel ne sont pas encore configurées. Contactez STC avant d’envoyer de l’argent.',
      visaUnavailable: 'Le paiement par Visa arrive bientôt. Nous vous prions de nous excuser pour ce désagrément.',
      badge: 'MEILLEUR CHOIX', energyTitle: 'Plus d’énergie ?', energyBody: 'L’énergie est utilisée pour les leçons et les messages à Sewingo AI. Découvrez les offres.'
    }
  };
  const french = () => document.documentElement.dataset.language === 'fr';
  const dialog = document.createElement('dialog');
  dialog.className = 'plans-dialog';
  dialog.setAttribute('aria-labelledby', 'plansTitle');
  dialog.innerHTML = `
    <section class="plans-modal">
      <div class="plans-galaxy" aria-hidden="true"></div>
      <div class="plans-galaxy-sky" aria-hidden="true"></div>
      <i class="plans-meteor" aria-hidden="true"></i>
      <i class="plans-meteor plans-meteor--two" aria-hidden="true"></i>
      <button class="plans-close" type="button" aria-label="Close plans">×</button>
      <div class="plans-eyebrow">✦ <span></span></div>
      <h2 id="plansTitle"></h2><p class="plans-subtitle"></p>
      <div class="plans-current-plan" hidden><span class="current-plan-label"></span><strong class="current-plan-time"></strong></div>
      <div class="plans-grid">
        <article class="plan-card plan-card--pro"><div class="plan-card-top"><span class="plan-name"></span><strong class="plan-price"></strong></div><ul></ul><button type="button" class="plan-choose"></button></article>
        <article class="plan-card plan-card--stc"><span class="plan-badge"></span><div class="plan-card-top"><span class="plan-name"></span><strong class="plan-price"></strong></div><ul></ul><button type="button" class="plan-choose"></button></article>
      </div>
      <section class="payment-methods" hidden aria-live="polite">
        <div class="payment-methods-heading"><h3 class="payment-methods-title"></h3><span class="payment-setup-badge"></span></div>
        <div class="payment-method-list">
          <button class="payment-method" type="button" data-payment-method="baridi" aria-pressed="false"><img class="payment-method-logo payment-method-logo--baridi" src="baridimob.png" alt="" aria-hidden="true"><span class="payment-method-copy"><strong class="payment-method-baridi"></strong><small class="payment-method-baridi-detail"></small></span><span class="payment-method-arrow" aria-hidden="true">↗</span></button>
          <button class="payment-method" type="button" data-payment-method="visa" aria-pressed="false"><img class="payment-method-logo payment-method-logo--visa" src="Visa.svg" alt="" aria-hidden="true"><span class="payment-method-copy"><strong class="payment-method-visa"></strong><small class="payment-method-visa-detail"></small></span><span class="payment-method-arrow" aria-hidden="true">↗</span></button>
        </div>
        <p class="payment-setup-message"></p>
      </section>
      <section class="manual-payment-instructions" hidden aria-live="polite">
        <h3 class="manual-payment-title"></h3><strong class="manual-payment-amount"></strong>
        <dl class="manual-payment-details"></dl>
        <p class="manual-payment-contact"></p><p class="manual-payment-verification"></p>
      </section>
      <form class="plans-code-form" novalidate>
        <label for="plansCode"></label>
        <div class="plans-code-controls"><input id="plansCode" name="code" type="text" maxlength="32" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder=""><button class="plans-redeem" type="submit"></button></div>
      </form>
      <p class="plans-status" role="status" aria-live="polite" hidden></p>
      <p class="plans-footnote"></p>
    </section>`;
  document.body.appendChild(dialog);
  const q = selector => dialog.querySelector(selector);
  function render() {
    const t = copy[french() ? 'fr' : 'en'];
    document.querySelectorAll('.premium-plans-button').forEach(button => {
      const subscribed = Boolean(document.documentElement.dataset.membership);
      button.setAttribute('aria-label', subscribed ? t.premiumSubscribed : t.premiumLabel);
      button.querySelector('.premium-button-label').textContent = subscribed ? t.premiumSubscribed : t.premiumPrimary;
    });
    const plan = document.documentElement.dataset.membership;
    const currentPlan = q('.plans-current-plan');
    currentPlan.hidden = !plan;
    if (plan) {
      q('.current-plan-label').textContent = t.currentPlan(plan === 'stc' ? 'STC' : 'Pro');
      const expiry = Date.parse(document.documentElement.dataset.membershipExpiresAt || '');
      const remainingMs = expiry - Date.now();
      if (!Number.isFinite(expiry)) q('.current-plan-time').textContent = t.expired;
      else if (remainingMs <= 0) q('.current-plan-time').textContent = t.ended;
      else if (remainingMs < 24 * 60 * 60 * 1000) q('.current-plan-time').textContent = t.lessThanDay;
      else q('.current-plan-time').textContent = t.daysLeft(Math.ceil(remainingMs / (24 * 60 * 60 * 1000)));
    }
    q('.plans-eyebrow span').textContent = t.eyebrow;
    q('.payment-methods').hidden = true;
    q('.manual-payment-instructions').hidden = true;
    q('.payment-methods-title').textContent = '';
    q('.payment-setup-badge').textContent = t.setupRequired;
    q('.payment-method-baridi').textContent = t.paymentBaridi;
    q('.payment-method-baridi-detail').textContent = t.paymentBaridiDetail;
    q('.payment-method-visa').textContent = t.paymentVisa;
    q('.payment-method-visa-detail').textContent = t.paymentVisaDetail;
    q('.payment-setup-message').textContent = t.paymentSetup;
    q('#plansTitle').textContent = t.title;
    q('.plans-subtitle').textContent = t.subtitle;
    q('.plans-close').setAttribute('aria-label', t.close);
    q('.plan-badge').textContent = t.badge;
    const cards = [...dialog.querySelectorAll('.plan-card')];
    [[t.pro, t.proPrice, t.proFeatures], [t.stc, t.stcPrice, t.stcFeatures]].forEach(([name, price, features], i) => {
      const card = cards[i];
      card.querySelector('.plan-name').textContent = name;
      card.querySelector('.plan-price').textContent = price;
      card.querySelector('ul').replaceChildren(...features.map(feature => {
        const item = document.createElement('li'); item.textContent = feature; return item;
      }));
      card.querySelector('.plan-choose').textContent = t.choose;
      card.querySelector('.plan-choose').onclick = () => {
        q('.plans-status').hidden = true;
        q('.payment-methods-title').textContent = t.paymentTitle(name);
        q('.payment-methods').hidden = false;
        q('.payment-methods').dataset.plan = i === 0 ? 'pro' : 'stc';
        q('.payment-methods').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };
    });
    q('.plans-footnote').textContent = t.soon;
    q('.plans-code-form label').textContent = t.codePrompt;
    q('#plansCode').placeholder = t.codePlaceholder;
    q('.plans-redeem').textContent = t.redeem;
  }
  q('.plans-close').addEventListener('click', () => dialog.close());
  dialog.querySelectorAll('[data-payment-method]').forEach(button => button.addEventListener('click', () => {
    dialog.querySelectorAll('[data-payment-method]').forEach(option => {
      const selected = option === button;
      option.classList.toggle('is-selected', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    const t = copy[french() ? 'fr' : 'en'];
    const manualPanel = q('.manual-payment-instructions');
    manualPanel.hidden = false;
    if (button.dataset.paymentMethod === 'visa') {
      q('.manual-payment-title').textContent = t.paymentVisa;
      q('.manual-payment-amount').textContent = '';
      q('.manual-payment-details').replaceChildren();
      q('.manual-payment-contact').textContent = t.visaUnavailable;
      q('.manual-payment-verification').textContent = '';
    } else {
      const plan = q('.payment-methods').dataset.plan === 'stc' ? 'stc' : 'pro';
      const price = plan === 'stc' ? t.stcPrice : t.proPrice;
      q('.manual-payment-title').textContent = t.manualTitle;
      q('.manual-payment-amount').textContent = t.manualAmount(price);
      const details = [
        [t.manualRecipient, manualBaridi.recipientName],
        [t.manualCcp, manualBaridi.ccp],
        [t.manualRip, manualBaridi.rip]
      ].filter(([, value]) => value);
      const configured = Boolean(manualBaridi.ccp || manualBaridi.rip);
      q('.manual-payment-details').replaceChildren(...(configured ? details : []).flatMap(([label, value]) => {
        const term = document.createElement('dt'); term.textContent = label;
        const description = document.createElement('dd'); description.textContent = value;
        return [term, description];
      }));
      const contact = q('.manual-payment-contact');
      if (configured) {
        const notice = document.createElement('span');
        notice.textContent = `${t.manualReceiptNotice} `;
        const email = document.createElement('a');
        email.href = 'mailto:systemstechnologiescompany@gmail.com';
        email.textContent = 'systemstechnologiescompany@gmail.com';
        contact.replaceChildren(notice, email);
      } else {
        contact.textContent = t.manualMissing;
      }
      q('.manual-payment-verification').textContent = configured ? t.manualVerify : '';
    }
    manualPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }));
  q('.plans-code-form').addEventListener('submit', async event => {
    event.preventDefault();
    const t = copy[french() ? 'fr' : 'en'];
    const input = q('#plansCode');
    const button = q('.plans-redeem');
    const status = q('.plans-status');
    const code = input.value.trim();
    if (!code) { input.focus(); return; }
    const client = window.stcSupabase || (() => {
      const config = window.STC_SUPABASE_CONFIG || {};
      return window.supabase?.createClient && config.url && config.publishableKey
        ? window.supabase.createClient(config.url, config.publishableKey, { auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true } })
        : null;
    })();
    if (!client) { status.textContent = t.codeService; status.hidden = false; return; }
    let session;
    try { const sessionResult = await client.auth.getSession(); session = sessionResult.data?.session; }
    catch { status.textContent = t.codeService; status.hidden = false; return; }
    if (!session) { status.textContent = t.codeSignIn; status.hidden = false; return; }
    button.disabled = true;
    button.textContent = t.redeeming;
    status.hidden = true;
    try {
      const { data, error } = await client.functions.invoke('redeem-premium-code', { body: { code } });
      if (error) {
        let detail = {};
        try { detail = await error.context.clone().json(); } catch {}
        if (detail.reason === 'RATE_LIMITED') throw new Error('RATE_LIMITED');
        if (detail.reason === 'INVALID_CODE') throw new Error('INVALID_CODE');
        throw new Error('SERVICE');
      }
      const plan = data?.plan === 'stc' ? 'STC' : 'Pro';
      const until = data?.expiresAt ? new Date(data.expiresAt).toLocaleDateString(french() ? 'fr-FR' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
      status.textContent = `${t.codeSuccess(plan)} ${until}.`;
      status.dataset.state = 'success';
      status.hidden = false;
      input.value = '';
      window.dispatchEvent(new CustomEvent('stc:membership-change', { detail: { plan: data.plan, expiresAt: data.expiresAt } }));
    } catch (error) {
      status.textContent = error.message === 'RATE_LIMITED' ? t.codeLimit : error.message === 'INVALID_CODE' ? t.codeInvalid : t.codeService;
      status.dataset.state = 'error';
      status.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = t.redeem;
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  window.addEventListener('stc:language-change', render);
  window.addEventListener('stc:membership-theme-ready', render);
  window.STCPlans = {
    open({ depleted = false } = {}) {
      render();
      q('.plans-status').hidden = !depleted;
      if (depleted) {
        const t = copy[french() ? 'fr' : 'en'];
        q('#plansTitle').textContent = t.energyTitle;
        q('.plans-subtitle').textContent = t.energyBody;
        q('.plans-status').textContent = t.soon;
        q('.plans-status').hidden = false;
      }
      if (!dialog.open) dialog.showModal();
    }
  };
  document.querySelectorAll('[data-open-plans]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault(); window.STCPlans.open({ membership: document.documentElement.dataset.membership });
  }));
  render();
})();
