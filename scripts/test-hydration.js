// Simple script to test if hydration issues are resolved
console.log('🧪 Testing hydration fix...');

// Check if suppressHydrationWarning is properly set
const htmlElement = document.documentElement;
const bodyElement = document.body;

console.log('HTML suppressHydrationWarning:', htmlElement.getAttribute('suppressHydrationWarning'));
console.log('Body suppressHydrationWarning:', bodyElement.getAttribute('suppressHydrationWarning'));

// Check theme-related classes
console.log('HTML classes:', htmlElement.className);
console.log('Body classes:', bodyElement.className);

console.log('✅ Hydration test completed');
