import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import {
	FiBell,
	FiHome,
	FiLogIn,
	FiLogOut,
	FiMail,
	FiSettings,
	FiUser,
} from "react-icons/fi";
import { RiQuillPenLine } from "react-icons/ri";
import { api } from "~/utils/api";
import { OtterIcon } from "./Icons";
import LoginWizard from "./LoginWizard";
import { MenuItem } from "./MenuItem";
import ModalWizard from "./ModalWizard";
import PostWizard from "./PostWizard";
import { SidebarButtons } from "./Sidebar";
import { SignedOut } from "./Signed";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
	AtSign,
	BellIcon,
	HomeIcon,
	LogOutIcon,
	MailIcon,
	MessagesSquareIcon,
	SettingsIcon,
	User2Icon,
	UserIcon,
} from "lucide-react";

export const CollapsedContext = createContext(false);

export default function Menu() {
	const [isCollapsed] = useState(false);
	const supabase = useSupabaseClient();
	const ctx = api.useContext();
	const user = useUser();

	const signOut = () => {
		void ctx.invalidate();
		void supabase.auth.signOut();
	};

	return (
		<CollapsedContext.Provider value={isCollapsed}>
			<div
				className={
					"sticky top-0 flex h-screen w-max shrink flex-col place-content-between py-4 text-2xl sm:px-2 lg:w-56"
				}
			>
				<div className="flex flex-col items-end gap-2">
					<div className="flex flex-row gap-2">
						<Link href="/">
							<Button variant="ghost" >
								ping
								<AtSign className="ml-2" />
							</Button>
						</Link>
					</div>

					<Link href="/">
						<Button variant="ghost" >
							home
							<HomeIcon className="ml-2" />
						</Button>
					</Link>

					<div className="flex flex-col md:hidden">
						<SidebarButtons />
					</div>

					{user && <MenuAuthed userId={user.id} />}
					{!user && 
						<ModalWizard wizardChildren={<LoginWizard />}>
							<Button  variant="ghost" >
								sign in
								<AtSign className="ml-2" />
							</Button>
							<MenuItem
								className="dropdown-right dropdown dropdown-hover"
								text={"Sign In"}
								icon={<FiLogIn />}
							/>
						</ModalWizard>
					} 

					<ModalWizard
						wizardChildren={<PostWizard placeholder="write a new ping..." />}
					>
						<MenuItem
							className={`my-2 border-2 border-primary font-bold text-primary hover:border-primary-focus hover:text-primary-focus ${
								isCollapsed ? "" : "pl-2 sm:pl-3 lg:pl-10"
							} `}
							text={"Ping"}
							icon={<RiQuillPenLine size={24} />}
						/>
					</ModalWizard>
				</div>
			</div>
		</CollapsedContext.Provider>
	);
}

export const MenuAuthed = ({ userId }: { userId: string }) => {
	const { data: profile } = api.profiles.get.useQuery({
		id: userId,
	});
	const supabase = useSupabaseClient();
	const ctx = api.useContext();
	const user = useUser();

	const signOut = () => {
		void ctx.invalidate();
		void supabase.auth.signOut();
	};

	const todo = () => toast.error("Not implemented yet");

	return (
		<>
			<Button variant="ghost" >
				messages
				<MailIcon className="ml-2" />
			</Button>
			<Button variant="ghost" >
				notifications
				<BellIcon className="ml-2" />
			</Button>
			<Link href={`${profile?.username ? `/${profile.username}` : undefined}`}>
				<Button variant="ghost">
					profile
					<UserIcon className="ml-2" />
				</Button>
			</Link>
			<Button variant="ghost" >
				settings
				<SettingsIcon className="ml-2" />
			</Button>

			<Button variant="ghost" onClick={() => signOut()}>
				sign out
				<LogOutIcon className="ml-2" />
			</Button>
		</>
	);
};
