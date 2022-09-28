import useSupabase from "./useSupabase";

const useAuth = () => {
  const user = useState("user", () => null);
  const { supabase } = useSupabase();

  supabase.auth.onAuthStateChange((e, session) => {
    //@ts-ignore
    user.value = session?.user || null;
  });

  const signUp = async ({ email, password, ...metadata }) => {
    const { user: u, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: metadata,
        redirectTo: `${window.location.origin}/myprofile?source=email`,
      }
    );
    if (error) throw error;
    return u;
  };

  const signIn = async ({ email, password }) => {
    const { user: u, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;
    return u;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLoggedIn = () => {
    //@ts-ignore
    return !!user.value;
  };

  return {
    user,
    signUp,
    signIn,
    signOut,
    isLoggedIn,
  };
};

export default useAuth;
function useState(arg0: string, arg1: () => any) {
  throw new Error("Function not implemented.");
}
