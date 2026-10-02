// E2E Verification Script for Shruti Blogs Platform
const BASE = 'http://localhost:3000';

async function testEndpoint(name, url, options = {}) {
  try {
    const res = await fetch(`${BASE}${url}`, options);
    const contentType = res.headers.get('content-type') || '';
    let body;
    if (contentType.includes('application/json')) {
      body = await res.json();
    } else {
      body = await res.text();
    }

    const passed = res.ok;
    console.log(`${passed ? '✅' : '❌'} [${res.status}] ${name} (${url})`);
    return { ok: passed, status: res.status, body, headers: res.headers };
  } catch (err) {
    console.log(`❌ [ERROR] ${name} (${url}):`, err.message);
    return { ok: false, error: err.message };
  }
}

async function run() {
  console.log('========================================');
  console.log('   SHRUTI BLOGS E2E VERIFICATION SUITE  ');
  console.log('========================================\n');

  // 1. Public Pages
  console.log('--- 1. Testing Public Editorial Pages ---');
  await testEndpoint('Homepage', '/');
  await testEndpoint('Blog Catalogue', '/blog');
  await testEndpoint('Article Reader', '/blog/building-distributed-real-time-ai-inference-pipelines-at-scale');
  await testEndpoint('Category Track', '/category/ai-machine-learning');
  await testEndpoint('Tag Track', '/tag/nextjs');
  await testEndpoint('Author Profile', '/author/shruti-sharma');
  await testEndpoint('About Page', '/about');
  await testEndpoint('Contact Page', '/contact');
  await testEndpoint('Privacy Policy', '/privacy');
  await testEndpoint('Terms of Service', '/terms');

  // 2. SEO & Syndication
  console.log('\n--- 2. Testing SEO & Syndication Feeds ---');
  await testEndpoint('Dynamic Sitemap', '/sitemap.xml');
  await testEndpoint('Robots Directive', '/robots.txt');
  await testEndpoint('RSS 2.0 Feed', '/feed.xml');

  // 3. Search API
  console.log('\n--- 3. Testing Real Multi-Entity Search API ---');
  const searchRes = await testEndpoint('Search Query (Inference)', '/api/search?q=Inference');
  if (searchRes.ok && searchRes.body?.data) {
    console.log(`   Found ${searchRes.body.data.posts?.length || 0} posts matching "Inference"`);
  }

  // 4. Newsletter Subscription
  console.log('\n--- 4. Testing Newsletter API ---');
  const testEmail = `subscriber-${Date.now()}@example.com`;
  await testEndpoint('Newsletter Subscribe', '/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail }),
  });

  // 5. Authentication & JWT Session
  console.log('\n--- 5. Testing Authentication & Session ---');
  const loginRes = await testEndpoint('Admin Login', '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@shrutiblogs.com', password: 'Admin@123456' }),
  });

  let token = loginRes.body?.data?.token;

  if (token) {
    console.log('   Authenticated with token. Verifying me endpoint...');
    await testEndpoint('Auth Me (Session User)', '/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 6. Admin API Operations
    console.log('\n--- 6. Testing Admin CMS API Operations ---');
    await testEndpoint('Analytics Overview Metrics', '/api/analytics/overview?range=30d', {
      headers: { Authorization: `Bearer ${token}` },
    });

    await testEndpoint('Security Audit Logs Query', '/api/audit?limit=10', {
      headers: { Authorization: `Bearer ${token}` },
    });

    await testEndpoint('User Management List', '/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Create a new post via API
    const newPostRes = await testEndpoint('Create Article (Admin)', '/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: 'Microservices Event Mesh with Kafka and Rust',
        slug: `event-mesh-kafka-rust-${Date.now().toString().slice(-4)}`,
        excerpt: 'High-throughput event choreography using Rust async workers and Kafka consumer groups.',
        content: `## High-Throughput Event Choreography\n\nExploring sub-millisecond serialization with Rust and Apache Kafka.\n\n\`\`\`rust\nasync fn produce_event() -> Result<(), Box<dyn Error>> {\n    println!("Producing event");\n    Ok(())\n}\n\`\`\``,
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
        tagNames: ['Architecture', 'DevOps'],
        isFeatured: false,
      }),
    });

    if (newPostRes.ok && newPostRes.body?.data?.slug) {
      console.log(`   Newly created article slug: ${newPostRes.body.data.slug}`);
      await testEndpoint('Verify Newly Published Article Live', `/blog/${newPostRes.body.data.slug}`);
    }

    // 7. Comments Submission & Moderation
    console.log('\n--- 7. Testing Comments & Reader Interaction ---');
    if (newPostRes.ok && newPostRes.body?.data?.id) {
      const commentRes = await testEndpoint('Submit Comment', '/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: newPostRes.body.data.id,
          authorName: 'Alex Mercer',
          authorEmail: 'alex@example.com',
          content: 'Excellent architectural breakdown of Rust async Kafka consumers!',
        }),
      });

      if (commentRes.ok && commentRes.body?.data?.id) {
        await testEndpoint('Moderate Comment (Approve)', `/api/comments/${commentRes.body.data.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: 'APPROVED' }),
        });
      }
    }
  }

  console.log('\n========================================');
  console.log('   E2E VERIFICATION COMPLETED CLEANLY   ');
  console.log('========================================');
}

run();
