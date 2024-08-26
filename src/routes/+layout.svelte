<script>import "../app.css";
import {
    Navbar,
    NavBrand,
    NavHamburger,
    NavLi,
    NavUl,
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper
} from "flowbite-svelte";
import {
    ArrowRightToBracketOutline,
    ChartPieSolid, EditOutline, FolderDuplicateSolid,
} from "flowbite-svelte-icons";
</script>

<div class="grid-layout">
    <div class="top-container">
        <Navbar>
            <NavBrand href="/">
                <img src="/src/images/logo.svg" class="me-3 h-6 sm:h-9" alt="DataQrunch Logo" />
                <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">DataQrunch</span>
            </NavBrand>
            <NavHamburger/>
            <NavUl class="nav-list">
                <NavLi href="/">Home</NavLi>
                <NavLi href="/about">About</NavLi>
            </NavUl>
        </Navbar>
    </div>
    
    <aside class="sidebar">
        <Sidebar>
            <SidebarWrapper style="width: 80%; overflow:hidden">
                <SidebarGroup>
                    <SidebarItem label="Dashboard">
                        <svelte:fragment slot="icon">
                            <ChartPieSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        </svelte:fragment>
                    </SidebarItem>
                    <SidebarItem label="Datasets" href="/groups">
                        <svelte:fragment slot="icon">
                            <FolderDuplicateSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                        </svelte:fragment>
                    </SidebarItem>
                    <SidebarItem label="Sign In">
                        <svelte:fragment slot="icon">
                            <ArrowRightToBracketOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        </svelte:fragment>
                    </SidebarItem>
                    <SidebarItem label="Sign Up">
                        <svelte:fragment slot="icon">
                            <EditOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        </svelte:fragment>
                    </SidebarItem>
                </SidebarGroup>
            </SidebarWrapper>
        </Sidebar>
    </aside>
    <main class="content">
        <slot></slot>
    </main>
</div>

<style>
    .grid-layout {
        display: grid;
        grid-template-columns: [sidebar-col] min(20vw, 200px) [main-col] auto ;
    }
    .top-container{
        grid-column: 1 / span 2;
        grid-row: 1;
    }

    .sidebar {
        overflow: clip;
        grid-column: 1 / span 1;
        grid-row: span;
    }

    .content {
        grid-column: span;
    }
    
</style>
