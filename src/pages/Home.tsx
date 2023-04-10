import { useRouter } from 'hooks/useRouter';

export default function Home() {
  const { routeTo } = useRouter();
  return (
    <div className="page-wrapper">
      <h1 className="page-title">Home</h1>
      <button
        className="button move-button"
        onClick={() => {
          routeTo('/signin');
        }}
      >
        로그인하러 가기
      </button>
    </div>
  );
}
