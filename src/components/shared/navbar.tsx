import { ThemeSwitcher } from "./theme-switcher";

export const Navbar = () => {
	return (
		<header className="sticky top-0 z-40 w-full bg-sidebar/80 backdrop-blur-sm before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border/64">
			<div className="container relative flex h-(--header-height) w-full items-center justify-between gap-2 px-4 sm:px-6">
				<div className="ms-auto flex items-center gap-2 md:flex-1 md:justify-end">
					<ThemeSwitcher />
				</div>
			</div>
		</header>
	);
};
