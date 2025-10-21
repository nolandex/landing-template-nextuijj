'use client';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { Nav } from '../components/navbar/navbar';
import { Layout } from '../components/navbar/layout';
import { Hero } from '../components/hero';
import { Trusted } from '../components/trusted';
import { Box } from '../components/styles/box';
import { Features1 } from '../components/features1';
import { Features2 } from '../components/features2';
import { Features3 } from '../components/features3';
import { Testimonials } from '../components/tesminonials';
import { Statistics } from '../components/statistics';
import { Plans } from '../components/plans';
import { Faq } from '../components/faq';
import { Trial } from '../components/trial';
import { Footer } from '../components/footer';

const Home: NextPage = () => {
  // 🔹 Tambahkan script Snap Midtrans (seperti di contoh checkoutmu)
  useEffect(() => {
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey: any = process.env.NEXT_PUBLIC_CLIENT_KEY;

    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <Nav />
      <Box as="main">
        <Hero />
        <Trusted />
        <Features1 />
        <Features2 />
        <Features3 />
        <Testimonials />
        <Statistics />

        {/* 🔹 Komponen Plans sudah mengandung tombol checkout/payment link */}
        <Plans />

        <Faq />
        <Trial />
        <Footer />
      </Box>
    </Layout>
  );
};

export default Home;
