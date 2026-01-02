import { TRAINERS_LIST, EVENTS } from './data.js';

// Reuse Sidebar/Header logic with Admin links
const Icons = {
    Dashboard: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
    Trainers: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    Logout: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
    Bell: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>'
};

function renderSidebar(activeHash) {
    const links = [
        { name: 'Dashboard', hash: '', icon: Icons.Dashboard },
        { name: 'Trainers', hash: '#trainers', icon: Icons.Trainers },
    ];

    const navItems = links.map(link => {
        const isActive = activeHash === link.hash || (link.hash !== '' && activeHash.startsWith(link.hash));
        return `
            <a href="${link.hash || '#'}" 
               class="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}">
                ${link.icon}
                ${link.name}
            </a>
        `;
    }).join('');

    return `
        <aside class="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col z-20 hidden md:flex">
             <div class="p-6 flex items-center gap-3 border-b border-slate-100">
                <div class="bg-indigo-600 p-2 rounded-lg text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <span class="text-xl font-bold text-slate-800">EduTrain</span>
            </div>
            <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
                <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">Administration</div>
                ${navItems}
            </nav>
            <div class="p-4 border-t border-slate-100">
                <a href="index.html" class="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                    ${Icons.Logout}
                    Sign Out
                </a>
            </div>
        </aside>
    `;
}

function renderHeader() {
    return `
        <header class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <h2 class="text-lg font-bold text-slate-700">Admin Portal</h2>
            <div class="flex items-center gap-6">
                <button class="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                    ${Icons.Bell}
                    <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div class="flex items-center gap-3 pl-6 border-l border-slate-200">
                    <div class="text-right hidden md:block">
                        <p class="text-sm font-semibold text-slate-800">Admin User</p>
                        <p class="text-xs text-slate-500">Super Admin</p>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border-2 border-slate-100">A</div>
                </div>
            </div>
        </header>
    `;
}

// --- Views ---

function renderDashboard() {
    const activeTrainers = TRAINERS_LIST.filter(t => t.status === 'active').length;
    const pendingTrainers = TRAINERS_LIST.filter(t => t.status === 'pending');
    
    return `
        <div class="space-y-8">
            <h1 class="text-2xl font-bold text-slate-800">Admin Overview</h1>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p class="text-sm font-medium text-slate-500">Total Trainers</p>
                    <h3 class="text-2xl font-bold text-slate-800 mt-1">${TRAINERS_LIST.length}</h3>
                </div>
                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-orange-500">
                    <p class="text-sm font-medium text-slate-500">Pending Approval</p>
                    <h3 class="text-2xl font-bold text-slate-800 mt-1">${pendingTrainers.length}</h3>
                </div>
            </div>
            
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div class="p-6 border-b border-slate-100 flex justify-between">
                    <h3 class="font-bold text-slate-800">Pending Approvals</h3>
                    <a href="#trainers" class="text-indigo-600 text-sm hover:underline">View All</a>
                </div>
                <div>
                    ${pendingTrainers.length ? pendingTrainers.map(t => `
                        <div class="p-4 flex justify-between items-center border-b border-slate-50 last:border-0 hover:bg-slate-50">
                            <div class="flex items-center gap-3">
                                <img src="${t.avatarUrl}" class="w-10 h-10 rounded-full" />
                                <div><p class="font-bold text-sm">${t.name}</p><p class="text-xs text-slate-500">${t.specialization}</p></div>
                            </div>
                            <a href="#trainers/${t.id}" class="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded">Review</a>
                        </div>
                    `).join('') : '<div class="p-4 text-center text-slate-400">No pending approvals.</div>'}
                </div>
            </div>
        </div>
    `;
}

function renderTrainerList() {
    return `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold text-slate-800">Trainers Directory</h1>
                <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium">+ Add Trainer</button>
            </div>
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table class="w-full text-left">
                    <thead class="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th class="p-4 text-xs font-bold text-slate-500 uppercase">Trainer</th>
                            <th class="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                            <th class="p-4 text-xs font-bold text-slate-500 uppercase">Students</th>
                            <th class="p-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${TRAINERS_LIST.map(t => `
                            <tr class="hover:bg-slate-50">
                                <td class="p-4 flex items-center gap-3">
                                    <img src="${t.avatarUrl}" class="w-10 h-10 rounded-full"/>
                                    <div><p class="font-bold text-sm text-slate-800">${t.name}</p><p class="text-xs text-slate-500">${t.email}</p></div>
                                </td>
                                <td class="p-4">
                                    <span class="px-2 py-1 rounded-full text-xs font-bold uppercase ${t.status === 'active' ? 'bg-green-100 text-green-700' : t.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}">${t.status}</span>
                                </td>
                                <td class="p-4 text-sm text-slate-600">${t.totalStudents}</td>
                                <td class="p-4 text-right">
                                    <a href="#trainers/${t.id}" class="text-indigo-600 font-bold text-sm hover:underline">View</a>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderTrainerDetail(id) {
    const trainer = TRAINERS_LIST.find(t => t.id === id);
    if (!trainer) return '<div class="p-10 text-center">Trainer not found</div>';
    
    return `
        <div class="space-y-6">
             <a href="#trainers" class="text-slate-500 text-sm hover:text-indigo-600">&larr; Back to List</a>
             <div class="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
                <img src="${trainer.avatarUrl}" class="w-24 h-24 rounded-full border-4 border-slate-50" />
                <div>
                    <h1 class="text-2xl font-bold text-slate-800">${trainer.name}</h1>
                    <p class="text-slate-500">${trainer.specialization}</p>
                    <div class="mt-4 flex gap-4 text-sm text-slate-600">
                        <span>${trainer.email}</span>
                        <span>${trainer.phone}</span>
                    </div>
                </div>
             </div>
             <div class="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <h3 class="font-bold text-slate-800 mb-4">Bio</h3>
                <p class="text-slate-600">${trainer.bio}</p>
             </div>
        </div>
    `;
}

// --- Router ---

function router() {
    const app = document.getElementById('app');
    const hash = window.location.hash || '';
    
    document.getElementById('sidebar-container').innerHTML = renderSidebar(hash);
    document.getElementById('header-container').innerHTML = renderHeader();

    if (hash === '') {
        app.innerHTML = renderDashboard();
    } else if (hash === '#trainers') {
        app.innerHTML = renderTrainerList();
    } else if (hash.startsWith('#trainers/')) {
        const id = hash.split('/')[1];
        app.innerHTML = renderTrainerDetail(id);
    } else {
        app.innerHTML = '<div class="p-10 text-center text-slate-400">Page not found</div>';
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
