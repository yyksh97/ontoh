/* ONTOH website analytics. Public IDs only; never put passwords or tokens here. */
(function () {
  'use strict';
  if (window.ontohAnalytics) return;

  var GA4_ID = 'G-K8YLE1HTK4';
  var CLARITY_ID = 'yudy5as4me';
  var STORAGE_KEY = 'ontoh-analytics-consent-v1';
  var CONSENT_AGE = 180 * 24 * 60 * 60 * 1000;
  var allowedHost = /^(www\.)?ontoh\.co\.kr$/.test(window.location.hostname);
  var configured = /^G-[A-Z0-9]+$/.test(GA4_ID) && /^[a-z0-9]+$/.test(CLARITY_ID);
  var started = false;
  var consent = readConsent();
  var banner;
  var settings;

  function readConsent() {
    try {
      var value = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      if (value && (value.choice === 'granted' || value.choice === 'denied') &&
          typeof value.timestamp === 'number' && value.timestamp <= Date.now() &&
          Date.now() - value.timestamp < CONSENT_AGE) return value.choice;
    } catch (error) { /* Unavailable storage means consent must be requested again. */ }
    return null;
  }

  function cleanUrl(value, keepCampaign) {
    try {
      var url = new URL(value, window.location.href);
      var clean = url.origin + url.pathname;
      if (keepCampaign) {
        var campaign = new URLSearchParams();
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content'].forEach(function (key) {
          var item = url.searchParams.get(key);
          if (item && /^[a-zA-Z0-9_.-]{1,100}$/.test(item)) campaign.set(key, item);
        });
        if (campaign.toString()) clean += '?' + campaign.toString();
      }
      return clean;
    } catch (error) { return ''; }
  }

  function addScript(src, id) {
    var script = document.createElement('script');
    script.id = id;
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  function start() {
    if (started || consent !== 'granted' || !allowedHost || !configured) return;
    started = true;
    window['ga-disable-' + GA4_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, {
      page_location: cleanUrl(window.location.href, true),
      page_referrer: document.referrer ? cleanUrl(document.referrer, false) : '',
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    addScript('https://www.googletagmanager.com/gtag/js?id=' + GA4_ID, 'ontoh-ga4');

    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    window.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' });
    addScript('https://www.clarity.ms/tag/' + CLARITY_ID, 'ontoh-clarity');
  }

  function removeAnalyticsCookies() {
    document.cookie.split(';').forEach(function (entry) {
      var name = entry.trim().split('=')[0];
      if (!/^(_ga($|_)|_gid$|_gat($|_)|_clck$|_clsk$)/.test(name)) return;
      ['', window.location.hostname, '.' + window.location.hostname, 'ontoh.co.kr', '.ontoh.co.kr'].forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (domain ? '; domain=' + domain : '');
      });
    });
  }

  function choose(choice) {
    consent = choice;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: choice, timestamp: Date.now() })); }
    catch (error) { /* Current-page choice still works when storage is blocked. */ }
    if (banner) banner.hidden = true;
    if (settings) settings.focus();
    if (choice === 'granted') start();
    else {
      window['ga-disable-' + GA4_ID] = true;
      if (started) {
        window.clarity('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' });
        window.clarity('stop');
      }
      removeAnalyticsCookies();
      // A fresh page prevents loaded third-party SDKs from running after withdrawal.
      if (started) window.location.reload();
    }
  }

  function track(name, details) {
    if (consent !== 'granted' || !started || typeof window.gtag !== 'function') return;
    if (['contact_click', 'contact_channel_click', 'generate_lead'].indexOf(name) < 0) return;
    var params = {
      page_location: cleanUrl(window.location.href, true),
      page_referrer: document.referrer ? cleanUrl(document.referrer, false) : '',
      transport_type: 'beacon'
    };
    if (name === 'generate_lead') params.form_id = 'contactForm';
    if (name === 'contact_channel_click') {
      var channel = details && details.channel;
      if (['kakao', 'email', 'phone'].indexOf(channel) < 0) return;
      params.contact_channel = channel;
    }
    window.gtag('event', name, params);
  }

  function setupUi() {
    var style = document.createElement('style');
    var ease = 'cubic-bezier(0.16,1,0.3,1)';
    style.textContent = '#ontoh-analytics-banner[hidden]{display:none!important}' +
      '@keyframes ontoh-analytics-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}' +
      '#ontoh-analytics-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:10001;max-width:1040px;margin:0 auto;display:flex;align-items:center;gap:24px;padding:24px 28px;background:#fff;color:#212121;border:1px solid #E5E7EB;border-top:2px solid #0A2440;box-shadow:0 12px 40px rgba(10,36,64,.14);font:15px/1.65 Pretendard,system-ui,sans-serif;animation:ontoh-analytics-in .5s ' + ease + '}' +
      '#ontoh-analytics-banner .analytics-icon{flex-shrink:0;display:grid;place-items:center;width:52px;height:52px;background:#F5F6F8;border:1px solid #E5E7EB;color:#0169a9}' +
      '#ontoh-analytics-banner .analytics-text{flex:1;min-width:0}' +
      '#ontoh-analytics-banner h2{font-size:17px;font-weight:700;line-height:1.4;margin:0 0 4px;color:#0A2440}' +
      '#ontoh-analytics-banner p{margin:0;font-size:14px;line-height:1.7;color:#212121}' +
      '#ontoh-analytics-banner p .analytics-note{display:block;color:#555}' +
      '#ontoh-analytics-banner a{color:#0169a9;font-weight:600;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}' +
      '#ontoh-analytics-banner a:hover{color:#0A2440}' +
      '#ontoh-analytics-banner .analytics-actions{display:flex;gap:8px;flex-shrink:0}' +
      '#ontoh-analytics-banner button{font:inherit;font-size:14px;font-weight:600;min-width:116px;min-height:48px;padding:0 22px;cursor:pointer;border:1px solid #0A2440;border-radius:0;background:#fff;color:#0A2440;transition:background-color .25s ' + ease + ',color .25s ' + ease + '}' +
      '#ontoh-analytics-banner button:hover{background:#F5F6F8}' +
      '#ontoh-analytics-banner button[data-choice="granted"]{background:#0A2440;color:#fff}' +
      '#ontoh-analytics-banner button[data-choice="granted"]:hover{background:#0169a9;border-color:#0169a9}' +
      '.ontoh-analytics-settings{background:none;border:0;color:inherit;text-decoration:underline;cursor:pointer;font:inherit;padding:4px 0;margin-top:12px}' +
      '#ontoh-analytics-banner button:focus-visible,#ontoh-analytics-banner a:focus-visible,.ontoh-analytics-settings:focus-visible{outline:3px solid #0169a9;outline-offset:3px}' +
      '@media(max-width:720px){#ontoh-analytics-banner{flex-direction:column;align-items:stretch;gap:14px;left:10px;right:10px;bottom:10px;padding:16px 16px 14px;max-height:calc(100dvh - 20px);overflow:auto}#ontoh-analytics-banner .analytics-icon{display:none}#ontoh-analytics-banner h2{font-size:16px}#ontoh-analytics-banner p{font-size:13px;line-height:1.65}#ontoh-analytics-banner .analytics-actions button{flex:1;min-width:0}}' +
      '@media(prefers-reduced-motion:reduce){#ontoh-analytics-banner{animation:none}#ontoh-analytics-banner button{transition:none}}';
    document.head.appendChild(style);
    banner = document.createElement('section');
    banner.id = 'ontoh-analytics-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', '웹사이트 분석 설정');
    banner.hidden = consent !== null;
    banner.innerHTML = '<span class="analytics-icon" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg></span>' +
      '<div class="analytics-text"><h2>웹사이트 분석 설정</h2>' +
      '<p>사이트 개선을 위해 Google Analytics와 Microsoft Clarity로 방문 통계와 클릭·스크롤 행동을 분석합니다. <span class="analytics-note">분석은 허용한 경우에만 시작되며, 거부해도 홈페이지를 이용할 수 있습니다. <a href="/privacy.html">개인정보처리방침</a></span></p></div>' +
      '<div class="analytics-actions"><button type="button" data-choice="denied">분석 거부</button><button type="button" data-choice="granted">분석 허용</button></div>';
    banner.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-choice]');
      if (button) choose(button.getAttribute('data-choice'));
    });
    document.body.appendChild(banner);
    settings = document.createElement('button');
    settings.type = 'button';
    settings.className = 'ontoh-analytics-settings';
    settings.textContent = '웹사이트 분석 설정';
    settings.addEventListener('click', function () {
      banner.hidden = false;
      banner.querySelector('button').focus();
    });
    var footerContainer = document.querySelector('footer > div');
    (footerContainer || document.body).appendChild(settings);
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (/^mailto:/i.test(href)) track('contact_channel_click', { channel: 'email' });
      else if (/^tel:/i.test(href)) track('contact_channel_click', { channel: 'phone' });
      else {
        try {
          var url = new URL(href, window.location.href);
          if (url.hostname === 'pf.kakao.com') track('contact_channel_click', { channel: 'kakao' });
          else if (url.origin === window.location.origin && url.pathname === '/contact.html') track('contact_click');
        } catch (error) { /* Non-URL links are unrelated to analytics. */ }
      }
    });
    start();
  }

  window.ontohAnalytics = { track: track, openSettings: function () {
    if (settings) settings.click();
  } };
  window.addEventListener('storage', function (event) {
    if (event.key !== STORAGE_KEY) return;
    consent = readConsent();
    if (started && consent !== 'granted') choose(consent || 'denied');
    else {
      if (banner) banner.hidden = consent !== null;
      start();
    }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupUi);
  else setupUi();
}());
