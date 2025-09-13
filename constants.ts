import type { SelectOption } from './types';

export const DRESS_TYPES: SelectOption[] = [
  // Traditional & Fusion
  { value: 'saree', label: 'Saree' },
  { value: 'lehenga', label: 'Lehenga' },
  { value: 'anarkali suit', label: 'Anarkali Suit' },
  { value: 'salwar kameez', label: 'Salwar Kameez' },
  { value: 'sharara', label: 'Sharara' },
  { value: 'kurti with palazzos', label: 'Kurti with Palazzos' },
  { value: 'indo-western gown', label: 'Indo-Western Gown' },
  { value: 'sherwani', label: 'Sherwani' },
  { value: 'dhoti pants with crop top', label: 'Dhoti Pants & Crop Top' },
  // Modern
  { value: 'gown', label: 'Evening Gown' },
  { value: 'cocktail dress', label: 'Cocktail Dress' },
  { value: 'jumpsuit', label: 'Jumpsuit' },
  { value: 'blazer dress', label: 'Blazer Dress' },
  { value: 'bohemian maxi dress', label: 'Bohemian Maxi Dress' },
];

export const DRESS_COLORS: SelectOption[] = [
  // Reds & Pinks
  { value: 'crimson red', label: 'Crimson Red' },
  { value: 'hot pink', label: 'Hot Pink' },
  { value: 'rose gold', label: 'Rose Gold' },
  { value: 'maroon', label: 'Maroon' },
  // Blues & Greens
  { value: 'royal blue', label: 'Royal Blue' },
  { value: 'emerald green', label: 'Emerald Green' },
  { value: 'teal', label: 'Teal' },
  { value: 'pastel green', label: 'Pastel Green' },
  // Yellows & Oranges
  { value: 'sunshine yellow', label: 'Sunshine Yellow' },
  { value: 'mustard yellow', label: 'Mustard Yellow' },
  { value: 'burnt orange', label: 'Burnt Orange' },
  // Purples
  { value: 'deep purple', label: 'Deep Purple' },
  { value: 'pastel lavender', label: 'Pastel Lavender' },
  // Neutrals & Metallics
  { value: 'classic black', label: 'Classic Black' },
  { value: 'ivory white', label: 'Ivory White' },
  { value: 'shimmering gold', label: 'Shimmering Gold' },
  { value: 'silver', label: 'Silver' },
  // Multi-color
  { value: 'vibrant rainbow', label: 'Vibrant Rainbow' },
];

export const BODY_TYPES: SelectOption[] = [
  { value: 'slim', label: 'Slim' },
  { value: 'athletic', label: 'Athletic' },
  { value: 'normal build', label: 'Normal' },
  { value: 'chubby', label: 'Chubby' },
  { value: 'plus-sized', label: 'Plus-sized' },
];

export const HAIR_STYLES: SelectOption[] = [
  { value: 'long and wavy, cascading over her shoulders', label: 'Long Wavy' },
  { value: 'a chic short bob', label: 'Short Bob' },
  { value: 'an elegant updo', label: 'Elegant Updo' },
  { value: 'intricate braids', label: 'Braided' },
  { value: 'a sleek high ponytail', label: 'High Ponytail' },
  { value: 'curly and voluminous', label: 'Curly & Voluminous' },
  { value: 'straight and shoulder-length', label: 'Straight Shoulder-Length' },
];

export const HAIR_COLORS: SelectOption[] = [
  { value: 'natural black', label: 'Natural Black' },
  { value: 'chocolate brown', label: 'Chocolate Brown' },
  { value: 'honey blonde', label: 'Honey Blonde' },
  { value: 'fiery red', label: 'Fiery Red' },
  { value: 'platinum blonde', label: 'Platinum Blonde' },
  { value: 'burgundy', label: 'Burgundy' },
  { value: 'subtle brown highlights', label: 'Brown Highlights' },
  { value: 'vibrant blue streaks', label: 'Blue Highlights' },
  { value: 'pastel pink', label: 'Pastel Pink' },
];

export const LOCATIONS: SelectOption[] = [
  // India
  { value: 'in front of the Taj Mahal at sunrise', label: 'Taj Mahal, India' },
  { value: 'in a bustling market street in Jaipur', label: 'Jaipur Market, India' },
  { value: 'on a houseboat in the Kerala backwaters', label: 'Kerala Backwaters, India' },
  { value: 'amidst the ancient ruins of Hampi', label: 'Hampi Ruins, India' },
  { value: 'overlooking the Ganges in Varanasi', label: 'Varanasi Ghats, India' },
  // Worldwide
  { value: 'on a balcony overlooking the Santorini coastline', label: 'Santorini, Greece' },
  { value: 'in front of the Eiffel Tower at night', label: 'Eiffel Tower, Paris' },
  { value: 'in a serene Japanese cherry blossom garden', label: 'Kyoto Gardens, Japan' },
  { value: 'on a busy street in Times Square, New York', label: 'Times Square, NYC' },
  { value: 'with the Northern Lights in the background', label: 'Northern Lights, Iceland' },
  // Generic
  { value: 'in a modern minimalist studio', label: 'Minimalist Studio' },
  { value: 'in an enchanted forest at twilight', label: 'Enchanted Forest' },
  { value: 'inside a grand palace interior', label: 'Palace Interior' },
];

export const GAZE_DIRECTIONS: SelectOption[] = [
  { value: 'looking directly at the camera with a soft smile', label: 'At Camera' },
  { value: 'looking slightly to her right, with a serene expression', label: 'Right' },
  { value: 'looking slightly to her left, with a thoughtful expression', label: 'Left' },
  { value: 'looking up towards the sky, with a hopeful expression', label: 'Up' },
  { value: 'looking down, with a gentle, contemplative expression', label: 'Down' },
  { value: 'gazing towards the landmark in the background', label: 'Towards Landmark' },
];

export const ATMOSPHERES: SelectOption[] = [
  { value: 'warm and serene', label: 'Warm & Serene' },
  { value: 'dramatic and moody', label: 'Dramatic & Moody' },
  { value: 'bright and cheerful', label: 'Bright & Cheerful' },
  { value: 'ethereal and dreamy', label: 'Ethereal & Dreamy' },
  { value: 'cool and mysterious', label: 'Cool & Mysterious' },
  { value: 'golden hour', label: 'Golden Hour' },
  { value: 'soft and romantic', label: 'Soft & Romantic' },
  { value: 'high-energy and vibrant', label: 'High-Energy & Vibrant' },
  { value: 'sun-drenched and airy', label: 'Sun-drenched & Airy' },
  { value: 'neon noir', label: 'Neon Noir' },
  { value: 'mystical fog', label: 'Mystical Fog' },
];

export const PHOTO_LOOKS: SelectOption[] = [
  // Realistic & Cinematic
  { value: 'hyperrealistic', label: 'Hyperrealistic' },
  { value: 'cinematic and epic', label: 'Cinematic' },
  { value: 'a glamour magazine cover', label: 'Glamour Magazine' },
  // Vintage & Film
  { value: 'retro and artistic', label: 'Retro & Artistic' },
  // Fix: The value had a typo with an extra hyphen, causing a type error.
  { value: 'vintage film grain', label: 'Vintage Film' },
  { value: 'a black and white noir style', label: 'B&W Noir' },
  // Soft & Minimalist
  { value: 'clean and minimalist', label: 'Minimalist' },
  { value: 'a soft focus portrait', label: 'Soft Focus' },
  // Artistic & Stylized
  { value: 'an oil painting', label: 'Oil Painting' },
  { value: 'a watercolor illustration', label: 'Watercolor' },
  { value: 'a vibrant anime style', label: 'Anime Style' },
  { value: 'double exposure', label: 'Double Exposure' },
];

export const AI_TRENDS: SelectOption[] = [
  { value: 'no specific trend', label: 'None' },
  { value: 'a Cottagecore aesthetic', label: 'Cottagecore' },
  { value: 'a Y2K revival fashion style', label: 'Y2K Revival' },
  { value: 'a dark academia mood', label: 'Dark Academia' },
  { value: 'a futuristic cyberpunk chic look', label: 'Cyberpunk Chic' },
  { value: 'a royalcore grand and opulent theme', label: 'Royalcore' },
  { value: 'a minimalist and clean Scandi style', label: 'Scandi Minimalist' },
  { value: 'a vibrant Dopamine Dressing style', label: 'Dopamine Dressing' },
];
