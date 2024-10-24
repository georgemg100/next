import { useSession } from 'next-auth/react';

const SessionTest = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading session...</div>;
  }

  if (!session) {
    return <div>No active session</div>;
  }

  return (
    <div>
      <h2>Active Session Details:</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default SessionTest;
