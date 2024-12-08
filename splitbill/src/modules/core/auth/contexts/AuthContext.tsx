import { Session, User } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../../../../config/Supabase";

// Define the context type

export const AuthContext = createContext<{
	session: Session | null;
	user: User | null;
	isLoading: boolean;
	signOut: () => void;
	googleLogin: () => void;
}>({
	session: null,
	user: null,
	isLoading: true,
	signOut: () => {},
	googleLogin: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsLoading(false);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsLoading(false);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const value: {
		session: Session | null;
		user: User | null;
		isLoading: boolean;
		signOut: () => void;
		googleLogin: () => void;
	} = {
		session,
		user,
		isLoading,
		signOut: () => supabase.auth.signOut(),
		googleLogin: async () =>
			await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: import.meta.env.VITE_REDIRECT_URL,
				},
			}),
	};

	// console.log(value);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
