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
import GroupComponent from "../components/GroupComponent.svelte";
let spanClass = 'flex-1 ms-3 whitespace-nowrap';
export let data;
</script>
<Navbar  >
    <NavBrand href="/">
        <img src="/src/images/logo.svg" class="me-3 h-6 sm:h-9" alt="DataQrunch Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">DataQrunch</span>
    </NavBrand>
    <NavHamburger  />
    <NavUl >
        <NavLi href="/">Home</NavLi>
        <NavLi href="/about">About</NavLi>
    </NavUl>
</Navbar>

<Sidebar style="float: left; height: 100vh">
    <SidebarWrapper>
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
<slot></slot>
