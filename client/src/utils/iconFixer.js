/**
 * Icon Fixer Utility
 *
 * This utility ensures all Font Awesome icons display correctly
 * by fixing styling issues and providing fallbacks.
 */

// Icon mapping from custom f- prefix to standard fa- prefix
const iconMapping = {
  // Basic icons
  'f-ticket-alt': 'fa-ticket-alt',
  'f-play': 'fa-play',
  'f-map-marker-alt': 'fa-map-marker-alt',
  'f-calendar': 'fa-calendar',
  'f-calendar-alt': 'fa-calendar-alt',
  'f-clock': 'fa-clock',
  'f-location-dot': 'fa-location-dot',
  'f-money-bill': 'fa-money-bill',
  'f-users': 'fa-users',
  'f-tag': 'fa-tag',
  'f-bookmark': 'fa-bookmark',
  'f-share': 'fa-share',
  'f-check': 'fa-check',
  'f-times': 'fa-times',
  'f-envelope': 'fa-envelope',
  'f-phone-alt': 'fa-phone-alt',
  'f-home': 'fa-home',
  'f-search': 'fa-search',
  'f-bell': 'fa-bell',
  'f-map-marked-alt': 'fa-map-marker-alt',
  'f-compass': 'fa-compass',
  'f-handshake': 'fa-handshake',
  'f-quote-left': 'fa-quote-left',
  'f-arrow-right': 'fa-arrow-right',

  // Additional icons
  'f-star': 'fa-star',
  'f-heart': 'fa-heart',
  'f-user': 'fa-user',
  'f-cog': 'fa-cog',
  'f-sign-out-alt': 'fa-sign-out-alt',
  'f-sign-in-alt': 'fa-sign-in-alt',
  'f-trash': 'fa-trash',
  'f-edit': 'fa-edit',
  'f-plus': 'fa-plus',
  'f-minus': 'fa-minus',
  'f-info-circle': 'fa-info-circle',
  'f-question-circle': 'fa-question-circle',
  'f-exclamation-circle': 'fa-exclamation-circle',
  'f-exclamation-triangle': 'fa-exclamation-triangle',
  'f-lock': 'fa-lock',
  'f-unlock': 'fa-unlock',
  'f-eye': 'fa-eye',
  'f-eye-slash': 'fa-eye-slash',
  'f-download': 'fa-download',
  'f-upload': 'fa-upload',
  'f-link': 'fa-link',
  'f-unlink': 'fa-unlink',
  'f-external-link-alt': 'fa-external-link-alt',
  'f-copy': 'fa-copy',
  'f-save': 'fa-save',
  'f-print': 'fa-print',
  'f-camera': 'fa-camera',
  'f-video': 'fa-video',
  'f-image': 'fa-image',
  'f-file': 'fa-file',
  'f-file-alt': 'fa-file-alt',
  'f-folder': 'fa-folder',
  'f-folder-open': 'fa-folder-open',
  'f-archive': 'fa-archive',
  'f-shopping-cart': 'fa-shopping-cart',
  'f-shopping-bag': 'fa-shopping-bag',
  'f-credit-card': 'fa-credit-card',
  'f-dollar-sign': 'fa-dollar-sign',
  'f-euro-sign': 'fa-euro-sign',
  'f-pound-sign': 'fa-pound-sign',
  'f-comment': 'fa-comment',
  'f-comments': 'fa-comments',
  'f-thumbs-up': 'fa-thumbs-up',
  'f-thumbs-down': 'fa-thumbs-down',
  'f-share-alt': 'fa-share-alt',
  'f-rss': 'fa-rss',
  'f-wifi': 'fa-wifi',
  'f-signal': 'fa-signal',
  'f-bars': 'fa-bars',
  'f-th': 'fa-th',
  'f-th-list': 'fa-th-list',
  'f-list': 'fa-list',
  'f-list-ul': 'fa-list-ul',
  'f-list-ol': 'fa-list-ol',
  'f-table': 'fa-table',
  'f-filter': 'fa-filter',
  'f-sort': 'fa-sort',
  'f-sort-up': 'fa-sort-up',
  'f-sort-down': 'fa-sort-down',
  'f-chevron-up': 'fa-chevron-up',
  'f-chevron-down': 'fa-chevron-down',
  'f-chevron-left': 'fa-chevron-left',
  'f-chevron-right': 'fa-chevron-right',
  'f-arrow-up': 'fa-arrow-up',
  'f-arrow-down': 'fa-arrow-down',
  'f-arrow-left': 'fa-arrow-left',
  'f-arrow-right': 'fa-arrow-right',
  'f-long-arrow-up': 'fa-long-arrow-up',
  'f-long-arrow-down': 'fa-long-arrow-down',
  'f-long-arrow-left': 'fa-long-arrow-left',
  'f-long-arrow-right': 'fa-long-arrow-right',
  'f-expand': 'fa-expand',
  'f-compress': 'fa-compress',
  'f-sync': 'fa-sync',
  'f-spinner': 'fa-spinner',
  'f-circle-notch': 'fa-circle-notch',
  'f-map': 'fa-map',
  'f-globe': 'fa-globe',
  'f-flag': 'fa-flag',
  'f-star-half': 'fa-star-half',
  'f-paper-plane': 'fa-paper-plane',
  'f-lightbulb': 'fa-lightbulb',
  'f-building': 'fa-building',
  'f-industry': 'fa-industry',
  'f-university': 'fa-university',
  'f-hospital': 'fa-hospital',
  'f-medkit': 'fa-medkit',
  'f-stethoscope': 'fa-stethoscope',
  'f-user-md': 'fa-user-md',
  'f-user-nurse': 'fa-user-nurse',
  'f-user-graduate': 'fa-user-graduate',
  'f-graduation-cap': 'fa-graduation-cap',
  'f-book': 'fa-book',
  'f-books': 'fa-books',
  'f-book-open': 'fa-book-open',
  'f-newspaper': 'fa-newspaper',
  'f-pen': 'fa-pen',
  'f-pencil-alt': 'fa-pencil-alt',
  'f-marker': 'fa-marker',
  'f-highlighter': 'fa-highlighter',
  'f-paint-brush': 'fa-paint-brush',
  'f-palette': 'fa-palette',
  'f-film': 'fa-film',
  'f-music': 'fa-music',
  'f-guitar': 'fa-guitar',
  'f-headphones': 'fa-headphones',
  'f-ticket': 'fa-ticket',
  'f-theater-masks': 'fa-theater-masks',
  'f-glass-cheers': 'fa-glass-cheers',
  'f-utensils': 'fa-utensils',
  'f-coffee': 'fa-coffee',
  'f-pizza-slice': 'fa-pizza-slice',
  'f-hamburger': 'fa-hamburger',
  'f-ice-cream': 'fa-ice-cream',
  'f-birthday-cake': 'fa-birthday-cake',
  'f-cookie': 'fa-cookie',
  'f-candy-cane': 'fa-candy-cane',
  'f-carrot': 'fa-carrot',
  'f-apple-alt': 'fa-apple-alt',
  'f-lemon': 'fa-lemon',
  'f-pepper-hot': 'fa-pepper-hot',
  'f-wine-glass': 'fa-wine-glass',
  'f-wine-bottle': 'fa-wine-bottle',
  'f-cocktail': 'fa-cocktail',
  'f-glass-martini': 'fa-glass-martini',
  'f-beer': 'fa-beer',
  'f-mug-hot': 'fa-mug-hot',
  'f-tshirt': 'fa-tshirt',
  'f-socks': 'fa-socks',
  'f-hat-cowboy': 'fa-hat-cowboy',
  'f-hat-wizard': 'fa-hat-wizard',
  'f-crown': 'fa-crown',
  'f-glasses': 'fa-glasses',
  'f-sunglasses': 'fa-sunglasses',
  'f-shoe-prints': 'fa-shoe-prints',
  'f-baby': 'fa-baby',
  'f-baby-carriage': 'fa-baby-carriage',
  'f-child': 'fa-child',
  'f-female': 'fa-female',
  'f-male': 'fa-male',
  'f-user-friends': 'fa-user-friends',
  'f-users-cog': 'fa-users-cog',
  'f-user-tie': 'fa-user-tie',
  'f-user-tag': 'fa-user-tag',
  'f-user-shield': 'fa-user-shield',
  'f-user-check': 'fa-user-check',
  'f-user-clock': 'fa-user-clock',
  'f-user-edit': 'fa-user-edit',
  'f-user-minus': 'fa-user-minus',
  'f-user-plus': 'fa-user-plus',
  'f-user-times': 'fa-user-times',
  'f-user-injured': 'fa-user-injured',
  'f-user-astronaut': 'fa-user-astronaut',
  'f-user-ninja': 'fa-user-ninja',
  'f-user-secret': 'fa-user-secret',
  'f-address-book': 'fa-address-book',
  'f-address-card': 'fa-address-card',
  'f-id-badge': 'fa-id-badge',
  'f-id-card': 'fa-id-card',
  'f-fingerprint': 'fa-fingerprint',
  'f-key': 'fa-key',
  'f-passport': 'fa-passport',
  'f-door-open': 'fa-door-open',
  'f-door-closed': 'fa-door-closed',
  'f-sign': 'fa-sign',
  'f-restroom': 'fa-restroom',
  'f-shower': 'fa-shower',
  'f-bath': 'fa-bath',
  'f-toilet': 'fa-toilet',
  'f-toilet-paper': 'fa-toilet-paper',
  'f-trash-alt': 'fa-trash-alt',
  'f-dumpster': 'fa-dumpster',
  'f-recycle': 'fa-recycle',
  'f-broom': 'fa-broom',
  'f-soap': 'fa-soap',
  'f-hands-wash': 'fa-hands-wash',
  'f-pump-soap': 'fa-pump-soap',
  'f-sink': 'fa-sink',
  'f-faucet': 'fa-faucet',
  'f-hot-tub': 'fa-hot-tub',
  'f-swimming-pool': 'fa-swimming-pool',
  'f-water': 'fa-water',
  'f-fire': 'fa-fire',
  'f-fire-extinguisher': 'fa-fire-extinguisher',
  'f-smoke': 'fa-smoke',
  'f-smoking': 'fa-smoking',
  'f-smoking-ban': 'fa-smoking-ban',
  'f-wind': 'fa-wind',
  'f-cloud': 'fa-cloud',
  'f-cloud-rain': 'fa-cloud-rain',
  'f-cloud-showers-heavy': 'fa-cloud-showers-heavy',
  'f-cloud-sun': 'fa-cloud-sun',
  'f-cloud-sun-rain': 'fa-cloud-sun-rain',
  'f-cloud-moon': 'fa-cloud-moon',
  'f-cloud-moon-rain': 'fa-cloud-moon-rain',
  'f-sun': 'fa-sun',
  'f-moon': 'fa-moon',
  'f-rainbow': 'fa-rainbow',
  'f-snowflake': 'fa-snowflake',
  'f-icicles': 'fa-icicles',
  'f-temperature-high': 'fa-temperature-high',
  'f-temperature-low': 'fa-temperature-low',
  'f-umbrella': 'fa-umbrella',
  'f-umbrella-beach': 'fa-umbrella-beach',
  'f-meteor': 'fa-meteor',
  'f-bolt': 'fa-bolt',
  'f-poo-storm': 'fa-poo-storm',
  'f-smog': 'fa-smog',
  'f-tornado': 'fa-tornado',
  'f-hurricane': 'fa-hurricane',
  'f-snowman': 'fa-snowman',
  'f-mountain': 'fa-mountain',
  'f-tree': 'fa-tree',
  'f-leaf': 'fa-leaf',
  'f-seedling': 'fa-seedling',
  'f-spa': 'fa-spa',
  'f-flower': 'fa-flower',
  'f-cannabis': 'fa-cannabis',
  'f-wheat': 'fa-wheat',

  'f-hotdog': 'fa-hotdog',
  'f-bread-slice': 'fa-bread-slice',
  'f-cheese': 'fa-cheese',
  'f-egg': 'fa-egg',
  'f-drumstick-bite': 'fa-drumstick-bite',
  'f-fish': 'fa-fish',
  'f-bone': 'fa-bone',
  'f-apple-crate': 'fa-apple-crate',
  'f-bacon': 'fa-bacon',
  'f-salad': 'fa-salad',
  'f-soup': 'fa-soup',
  'f-mortar-pestle': 'fa-mortar-pestle',
  'f-utensil-spoon': 'fa-utensil-spoon',
  'f-knife-kitchen': 'fa-knife-kitchen',
  'f-blender': 'fa-blender',
  'f-glass-whiskey': 'fa-glass-whiskey',
  'f-wine-glass-alt': 'fa-wine-glass-alt',
  'f-flask': 'fa-flask',
};

/**
 * Fix all icons in the document
 * This function adds fallback classes to all icons with f- prefix
 */
export const fixAllIcons = () => {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIconFixer);
  } else {
    initIconFixer();
  }
};

/**
 * Initialize the icon fixer
 */
const initIconFixer = () => {
  // Fix all icons with f- prefix
  fixCustomIcons();

  // Add MutationObserver to fix dynamically added icons
  observeDOMChanges();

  // Fix all icons every 2 seconds as a fallback
  setInterval(fixCustomIcons, 2000);
};

/**
 * Fix all custom icons with f- prefix
 */
const fixCustomIcons = () => {
  // Get all elements with class starting with f-
  const customIcons = document.querySelectorAll('[class*="f-"]');

  customIcons.forEach(icon => {
    // Get all classes of the icon
    const classes = icon.className.split(' ');

    // Find classes starting with f-
    classes.forEach(className => {
      if (className.startsWith('f-')) {
        // Get corresponding fa- class
        const faClass = iconMapping[className];

        // Add fa class if not already present
        if (faClass && !icon.classList.contains('fa')) {
          icon.classList.add('fa');
        }

        // Add corresponding fa- class if not already present
        if (faClass && !icon.classList.contains(faClass)) {
          icon.classList.add(faClass);
        }

        // Ensure icon has normal font style
        icon.style.fontStyle = 'normal';
      }
    });
  });

  // Fix all Font Awesome icons to ensure they have normal font style
  const allIcons = document.querySelectorAll('.fa, .fas, .far, .fab');
  allIcons.forEach(icon => {
    icon.style.fontStyle = 'normal';
  });
};

/**
 * Observe DOM changes to fix dynamically added icons
 */
const observeDOMChanges = () => {
  // Create a MutationObserver to watch for DOM changes
  const observer = new MutationObserver((mutations) => {
    let shouldFixIcons = false;

    // Check if any mutations added nodes
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        shouldFixIcons = true;
      }
    });

    // Fix icons if needed
    if (shouldFixIcons) {
      fixCustomIcons();
    }
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

// Export default function
export default fixAllIcons;
