'use client';
import { Button, Card, Divider, Grid, Link, Text } from '@nextui-org/react';
import React, { useState } from 'react';
import { CheckIcon } from '../icons/CheckIcon';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';

// Contoh produk (bisa kamu ubah sesuai plan)
const products = [
  { id: 'free', name: 'Free', price: 0 },
  { id: 'premium', name: 'Premium', price: 19000 },
  { id: 'startup', name: 'Startup', price: 99000 },
  { id: 'enterprise', name: 'Enterprise', price: 199000 },
];

export const Plans = () => {
  const [paymentLink, setPaymentLink] = useState<string>("");

  const checkout = async (product: any) => {
    const data = {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
    };

    try {
      const response = await fetch('/api/tokenizer', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const responseData = await response.json();
      if (!responseData?.token) throw new Error('Invalid response data');

      (window as any).snap.pay(responseData.token);
    } catch (error: any) {
      console.error('Error during checkout:', error.message);
      alert('Gagal memulai pembayaran. Coba lagi.');
    }
  };

  const generatePaymentLink = async (product: any) => {
    const secret: any = process.env.NEXT_PUBLIC_SECRET;
    const encodedSecret = Buffer.from(secret).toString('base64');
    const basicAuth = `Basic ${encodedSecret}`;

    const data = {
      item_details: [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ],
      transaction_details: {
        order_id: `${product.id}-${Date.now()}`,
        gross_amount: product.price,
      },
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/v1/payment-links`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: basicAuth,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      setPaymentLink(result.payment_url);
      window.open(result.payment_url, '_blank');
    } catch (error) {
      console.error('Error creating payment link:', error);
      alert('Gagal membuat payment link');
    }
  };

  return (
    <>
      <Flex
        css={{ py: '$20', gap: '1rem', px: '$6' }}
        justify={'center'}
        wrap={'wrap'}
        direction={'column'}
        align={'center'}
      >
        <Flex direction={'column'} align={'center'}>
          <Text span css={{ color: '$blue600' }}>
            Awesome Feature
          </Text>
          <Text h2>Flexible Plans</Text>
        </Flex>

        <Flex css={{ gap: '2rem', width: '100%' }} wrap={'wrap'} justify={'center'}>
          {products.map((product) => (
            <Card key={product.id} css={{ p: '$6', mw: '400px' }}>
              <Card.Header>
                <Grid.Container css={{ pl: '$6' }}>
                  <Grid xs={12}>
                    <Text h4 css={{ lineHeight: '$xs' }}>
                      {product.name}
                    </Text>
                  </Grid>
                  <Grid xs={12}>
                    <Text css={{ color: '$accents8' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, nisl ut aliquam lacinia.
                    </Text>
                  </Grid>
                </Grid.Container>
              </Card.Header>

              <Card.Body css={{ py: '$4' }}>
                <Text css={{ display: 'contents' }} h2>
                  {product.price === 0 ? '$0' : `$${product.price / 1000}`}
                </Text>
                <Text css={{ display: 'contents', color: '$accents8' }}>/mo</Text>

                {product.price > 0 ? (
                  <>
                    <Button css={{ mt: '$7', mb: '$4' }} onClick={() => checkout(product)}>
                      Checkout via Snap
                    </Button>
                    <Button
                      css={{ mb: '$12' }}
                      color="secondary"
                      onClick={() => generatePaymentLink(product)}
                    >
                      Generate Payment Link
                    </Button>
                  </>
                ) : (
                  <Button css={{ mt: '$7', mb: '$12' }}>Get Started</Button>
                )}

                <Divider />
                <Box as={'ul'}>
                  <Flex as={'li'} css={{ py: '$2', gap: '$2' }} align={'center'}>
                    <CheckIcon />
                    <Text span css={{ color: '$accents8' }}>
                      Team Members
                    </Text>
                  </Flex>
                  <Flex as={'li'} css={{ py: '$2', gap: '$2' }} align={'center'}>
                    <CheckIcon />
                    <Text span css={{ color: '$accents8' }}>
                      Website Hosting
                    </Text>
                  </Flex>
                  <Flex as={'li'} css={{ py: '$2', gap: '$2' }} align={'center'}>
                    <CheckIcon />
                    <Text span css={{ color: '$accents8' }}>
                      Email Support
                    </Text>
                  </Flex>
                </Box>
              </Card.Body>
            </Card>
          ))}
        </Flex>
      </Flex>

      <Divider css={{ position: 'absolute', inset: '0p', left: '0', mt: '$5' }} />
    </>
  );
};
