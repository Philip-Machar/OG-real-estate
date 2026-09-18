import { useState, type FormEvent } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    const honeypot = formData.get('website_alt');
    if (honeypot && String(honeypot).trim() !== '') {
      setStatus('success');
      setEmail('');
      return;
    }

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('https://readdy.ai/api/form/d9f92akjvhh956i3lm7g', {
        method: 'POST',
        body: formData,
      });
      const responseText = await response.text();
      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }

      const isSpam =
        responseText.toLowerCase().includes('spam') ||
        parsed?.meta?.message?.toLowerCase().includes('spam') ||
        parsed?.meta?.detail?.toLowerCase().includes('spam');

      if (!response.ok || isSpam || (parsed && parsed.code !== 'OK')) {
        setStatus('error');
        setErrorMsg(
          parsed?.meta?.message || parsed?.meta?.detail || 'Something went wrong. Please try again.'
        );
        return;
      }

      setStatus('success');
      setEmail('');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again later.');
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <i className="ri-notification-3-line text-primary-600 text-xl" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground-950">
            Stay Updated
          </h2>
        </div>
        <p className="text-foreground-500 mb-8 text-lg">
          Subscribe to our notifications and never miss out on premium property
          listings and exclusive deals.
        </p>

        <form
          data-readdy-form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          {/* Honeypot */}
          <input
            type="text"
            name="website_alt"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            readOnly
            className="hp-field"
          />

          <div className="relative flex-1 max-w-md">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400">
              <i className="ri-mail-line" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-background-200 bg-card text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-8 py-3 bg-primary-500 text-primary-foreground rounded-lg font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <i className="ri-loader-4-line animate-spin" />
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>

        {status === 'success' && (
          <p className="text-sm text-primary-600 mt-4 font-medium">
            <i className="ri-check-line mr-1" />
            Thank you for subscribing! You'll receive our latest updates.
          </p>
        )}
        {status === 'error' && errorMsg && (
          <p className="text-sm text-red-500 mt-4 font-medium">{errorMsg}</p>
        )}

        <p className="text-xs text-foreground-500/60 mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}