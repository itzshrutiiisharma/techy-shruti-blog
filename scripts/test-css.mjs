async function testDev() {
  const homeRes = await fetch('http://localhost:3000/');
  console.log('Homepage status:', homeRes.status);
  const html = await homeRes.text();
  console.log('HTML length:', html.length);
  
  const cssMatches = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+)"/g)];
  console.log('CSS links found:', cssMatches.length);
  for (const m of cssMatches) {
    const cssUrl = 'http://localhost:3000' + m[1];
    const cssRes = await fetch(cssUrl);
    const cssText = await cssRes.text();
    console.log('CSS URL:', m[1], 'Status:', cssRes.status, 'Length:', cssText.length, 'Contains tailwind bg:', cssText.includes('F8FAFC') || cssText.includes('tailwind'));
  }
}

testDev().catch(console.error);
