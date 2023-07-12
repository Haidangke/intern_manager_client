import {
    faBookReader,
    faChalkboardUser,
    faGauge,
    faGraduationCap,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

export const sidebarTabs = [
    {
        id: 1,
        name: 'Dashboard',
        icon: faGauge,
        prefix: 'home',
        children: [
            {
                id: 11,
                name: 'Admin Dashboard',
                link: 'home',
            },
        ],
    },
    {
        id: 2,
        name: 'Interns',
        icon: faGraduationCap,
        prefix: 'interns',
        children: [
            {
                id: 21,
                name: 'Intern List',
                link: 'interns',
            },
        ],
    },
    {
        id: 3,
        name: 'Mentors',
        icon: faChalkboardUser,
        prefix: 'mentors',
        children: [
            {
                id: 31,
                name: 'Mentor List',
                link: 'mentors',
            },
        ],
    },
    {
        id: 4,
        name: 'Teams',
        icon: faBookReader,
        prefix: 'teams',
        children: [
            {
                id: 41,
                name: 'Team List',
                link: 'teams',
            },
        ],
    },
    {
        id: 5,
        name: 'Project',
        icon: faUsers,
        prefix: 'projects',
        children: [
            {
                id: 51,
                name: 'Project List',
                link: 'projects',
            },
        ],
    },
];
