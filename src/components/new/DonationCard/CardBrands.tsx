import styles from "./DonationPage.module.css";
export default function CardBrands() {
  return <div className={styles.cardBrands} aria-label="Visa, Mastercard, American Express and Discover">
    <svg role="img" aria-label="Visa" viewBox="0 0 48 30"><rect x=".5" y=".5" width="47" height="29" rx="4" fill="white" stroke="#e4e6e9"/><text x="6" y="21" fill="#1434CB" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="900" fontStyle="italic">VISA</text></svg>
    <svg role="img" aria-label="Mastercard" viewBox="0 0 48 30"><rect x=".5" y=".5" width="47" height="29" rx="4" fill="white" stroke="#e4e6e9"/><circle cx="19" cy="15" r="9" fill="#eb001b"/><circle cx="29" cy="15" r="9" fill="#f79e1b"/><path d="M24 7.5a9 9 0 0 1 0 15 9 9 0 0 1 0-15Z" fill="#ff5f00"/></svg>
    <svg role="img" aria-label="American Express" viewBox="0 0 48 30"><rect x=".5" y=".5" width="47" height="29" rx="4" fill="#006fcf"/><text x="24" y="14" textAnchor="middle" fill="white" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="7.5">AMERICAN</text><text x="24" y="22" textAnchor="middle" fill="white" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="8">EXPRESS</text></svg>
    <svg role="img" aria-label="Discover" viewBox="0 0 48 30"><rect x=".5" y=".5" width="47" height="29" rx="4" fill="white" stroke="#e4e6e9"/><circle cx="25" cy="15" r="6" fill="#f58220"/><text x="24" y="18" textAnchor="middle" fill="#222" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="7.5">DISCOVER</text></svg>
  </div>;
}
