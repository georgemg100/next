import Link from 'next/link';

export default function CancellationConfirmation() {
  return (
    <div>
      <h1>Subscription Cancelled</h1>
      <p>Your subscription has been successfully cancelled.</p>
      <p>We're sorry to see you go. If you change your mind, you can always subscribe again.</p>
      <Link href="/">
        Return to Homepage
      </Link>
    </div>
  );
}
