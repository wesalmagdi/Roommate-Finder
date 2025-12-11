export default function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div style={{ paddingTop: "120px" }}>
      <h1>Profile</h1>
      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
    </div>
  );
}
