import { EVENTS, COURSES, CURRENT_TRAINER, FEEDBACKS } from './data.js';

// Icons SVG Map
const Icons = {
    Dashboard: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
    Events: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
    Courses: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    Feedback: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
    Profile: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    Logout: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
    Bell: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    ArrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>'
};

// --- Components ---

function renderSidebar(activeHash) {
    const links = [
        { name: 'Dashboard', hash: '', icon: Icons.Dashboard },
        { name: 'My Events', hash: '#events', icon: Icons.Events },
        { name: 'My Courses', hash: '#courses', icon: Icons.Courses },
        { name: 'Feedback', hash: '#feedback', icon: Icons.Feedback },
        { name: 'My Profile', hash: '#profile', icon: Icons.Profile },
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
        <aside class="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col z-20 transition-transform duration-300 hidden md:flex">
            <div class="p-6 flex items-center gap-3 border-b border-slate-100">
                <div class="bg-indigo-600 p-2 rounded-lg text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <span class="text-xl font-bold text-slate-800">EduTrain</span>
            </div>
            <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
                <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">Instructor Menu</div>
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

function renderHeader(breadcrumbs) {
    const breadcrumbHTML = breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;
        if (isLast) return `<span class="font-semibold text-indigo-600 capitalize">${item.name}</span>`;
        return `
            <a href="${item.url}" class="hover:text-indigo-600 transition-colors capitalize">${item.name}</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-2 text-slate-300"><path d="m9 18 6-6-6-6"/></svg>
        `;
    }).join('');

    return `
        <header class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <nav class="flex items-center text-sm text-slate-500">
                <span class="font-medium text-slate-400">Home</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-2 text-slate-300"><path d="m9 18 6-6-6-6"/></svg>
                ${breadcrumbHTML}
            </nav>
            <div class="flex items-center gap-6">
                <button class="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                    ${Icons.Bell}
                    <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div class="flex items-center gap-3 pl-6 border-l border-slate-200">
                    <div class="text-right hidden md:block">
                        <p class="text-sm font-semibold text-slate-800">${CURRENT_TRAINER.name}</p>
                        <p class="text-xs text-slate-500 capitalize">${CURRENT_TRAINER.role}</p>
                    </div>
                    <img src="${CURRENT_TRAINER.avatarUrl}" alt="Profile" class="w-10 h-10 rounded-full object-cover border-2 border-slate-100" />
                </div>
            </div>
        </header>
    `;
}

// --- Pages ---

function renderDashboard() {
    const stats = [
        { label: 'Total Students', value: CURRENT_TRAINER.totalStudents.toLocaleString(), color: 'bg-blue-500' },
        { label: 'Active Courses', value: COURSES.length.toString(), color: 'bg-purple-500' },
        { label: 'Upcoming Events', value: EVENTS.filter(e => e.status === 'Upcoming').length.toString(), color: 'bg-orange-500' },
    ];

    const eventList = EVENTS.slice(0, 3).map(event => `
        <div onclick="window.location.hash='#events/${event.id}'" class="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer group border-b border-slate-100 last:border-0">
            <div class="bg-indigo-50 text-indigo-600 rounded-lg p-3 text-center min-w-[70px]">
                <span class="block text-xs font-bold uppercase tracking-wider">${new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                <span class="block text-xl font-bold">${new Date(event.date).getDate()}</span>
            </div>
            <div class="flex-1">
                <h4 class="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">${event.title}</h4>
                <div class="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span class="${event.type === 'Online' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'} px-2 py-0.5 rounded text-xs font-medium">${event.type}</span>
                    <span>${event.time}</span>
                </div>
            </div>
            <div class="self-center text-slate-300">
                ${Icons.ArrowRight}
            </div>
        </div>
    `).join('');

    return `
        <div class="space-y-8">
            <div class="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
                <div>
                    <h1 class="text-3xl font-bold mb-2">Welcome back, ${CURRENT_TRAINER.name}! 👋</h1>
                    <p class="text-indigo-100 opacity-90">You have classes scheduled. Keep up the great work!</p>
                    <div class="mt-6 flex gap-3">
                        <a href="#events" class="bg-white text-indigo-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-50 transition-colors inline-block">View Schedule</a>
                        <a href="#profile" class="bg-indigo-500 bg-opacity-30 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-opacity-40 transition-colors inline-block">Edit Profile</a>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${stats.map(stat => `
                    <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div class="${stat.color} p-4 rounded-xl text-white shadow-lg shadow-indigo-100 w-12 h-12 flex items-center justify-center">#</div>
                        <div>
                            <p class="text-slate-500 text-sm font-medium">${stat.label}</p>
                            <h3 class="text-2xl font-bold text-slate-800">${stat.value}</h3>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="bg-white rounded-xl border border-slate-100 shadow-sm">
                <div class="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 class="text-lg font-bold text-slate-800">Upcoming Classes</h2>
                    <a href="#events" class="text-sm text-indigo-600 font-semibold hover:underline">View All</a>
                </div>
                <div>${eventList}</div>
            </div>
        </div>
    `;
}

function renderEvents() {
    return `
        <div class="space-y-6">
            <div class="flex justify-between items-end">
                <div>
                    <h1 class="text-2xl font-bold text-slate-800">My Events</h1>
                    <p class="text-slate-500 mt-1">Manage your upcoming schedules and workshops.</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${EVENTS.map(event => `
                    <a href="#events/${event.id}" class="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 block">
                        <div class="h-48 overflow-hidden relative">
                            <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div class="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-md text-xs font-bold uppercase text-indigo-600">${event.status}</div>
                        </div>
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-3">
                                <span class="px-2 py-1 rounded text-xs font-semibold ${event.type === 'Online' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}">${event.type}</span>
                                <span class="text-xs text-slate-500 font-medium">${event.attendees} Attendees</span>
                            </div>
                            <h3 class="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600">${event.title}</h3>
                            <p class="text-sm text-slate-500 mb-4 line-clamp-2">${event.description}</p>
                            <div class="pt-4 border-t border-slate-100 text-indigo-600 text-sm font-semibold">View Details &rarr;</div>
                        </div>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
}

function renderEventDetail(id) {
    const event = EVENTS.find(e => e.id === id);
    if (!event) return '<div class="p-10 text-center">Event not found</div>';

    return `
        <div class="max-w-5xl mx-auto space-y-8">
            <div>
                <a href="#events" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-4">&larr; Back to My Events</a>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 class="text-3xl font-bold text-slate-800">${event.title}</h1>
                    <button class="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">Edit Event</button>
                </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-8">
                    <div class="rounded-2xl overflow-hidden h-[300px] shadow-sm"><img src="${event.image}" class="w-full h-full object-cover"/></div>
                    <div class="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                        <h2 class="text-xl font-bold text-slate-800 mb-4">About this Event</h2>
                        <p class="text-slate-600 leading-relaxed">${event.description}</p>
                    </div>
                </div>
                <div class="space-y-6">
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 class="font-bold text-slate-800 mb-4">Event Details</h3>
                        <div><p class="text-sm font-semibold">Date</p><p class="text-sm text-slate-500">${new Date(event.date).toDateString()}</p></div>
                        <div><p class="text-sm font-semibold">Time</p><p class="text-sm text-slate-500">${event.time}</p></div>
                        <div><p class="text-sm font-semibold">Location</p><p class="text-sm text-slate-500">${event.location}</p></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCourses() {
    return `
        <div class="space-y-6">
            <h1 class="text-2xl font-bold text-slate-800">My Courses</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${COURSES.map(course => `
                    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col md:flex-row h-full md:h-52">
                        <div class="w-full md:w-48 h-48 md:h-full shrink-0"><img src="${course.image}" class="w-full h-full object-cover" /></div>
                        <div class="p-6 flex flex-col justify-between flex-1">
                            <div>
                                <div class="flex justify-between items-start mb-2">
                                    <span class="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded font-semibold">${course.level}</span>
                                    <span class="text-yellow-500 text-sm font-bold">★ ${course.rating}</span>
                                </div>
                                <h3 class="text-xl font-bold text-slate-800 mb-1">${course.title}</h3>
                                <p class="text-slate-500 text-sm line-clamp-2">${course.description}</p>
                            </div>
                            <div class="mt-4 flex items-center justify-between pt-4 border-t border-slate-100">
                                <span class="text-sm text-slate-500 font-medium">${course.students} Students</span>
                                <a href="#courses/${course.id}" class="p-2 bg-slate-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors">View &rarr;</a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderCourseDetail(id) {
    const course = COURSES.find(c => c.id === id);
    if (!course) return '<div class="p-10 text-center">Course not found</div>';
    
    return `
        <div class="max-w-5xl mx-auto space-y-8">
            <div>
                <a href="#courses" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-4">&larr; Back to My Courses</a>
                <h1 class="text-3xl font-bold text-slate-800">${course.title}</h1>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-8">
                    <div class="rounded-2xl overflow-hidden h-[300px] shadow-sm relative">
                        <img src="${course.image}" class="w-full h-full object-cover" />
                        <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 text-white">${course.description}</div>
                    </div>
                    <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h2 class="text-xl font-bold text-slate-800 mb-4">Curriculum</h2>
                        <div class="space-y-4">
                            ${[1,2,3].map(i => `<div class="p-4 bg-slate-50 rounded-lg flex items-center gap-4"><div class="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">${i}</div><div><h4 class="font-bold text-sm">Module ${i}</h4><p class="text-xs text-slate-500">Lesson content placeholder</p></div></div>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="space-y-6">
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 class="font-bold text-slate-800 mb-4">Stats</h3>
                        <p class="flex justify-between text-sm py-2 border-b border-slate-50"><span>Students</span> <b>${course.students}</b></p>
                        <p class="flex justify-between text-sm py-2 border-b border-slate-50"><span>Modules</span> <b>${course.modules}</b></p>
                        <p class="flex justify-between text-sm py-2"><span>Rating</span> <b>${course.rating}</b></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderFeedback() {
    return `
        <div class="space-y-8">
             <div class="bg-indigo-900 rounded-2xl p-8 text-white text-center">
                 <h1 class="text-3xl font-bold mb-2">Student Feedback</h1>
                 <p class="text-indigo-200">See what your students are saying.</p>
             </div>
             <div class="grid grid-cols-1 gap-4">
                ${FEEDBACKS.map(f => `
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex gap-3">
                                <img src="${f.studentAvatar}" class="w-10 h-10 rounded-full" />
                                <div><h4 class="font-bold text-slate-800 text-sm">${f.studentName}</h4><p class="text-xs text-slate-500">${new Date(f.date).toLocaleDateString()}</p></div>
                            </div>
                            <span class="text-yellow-500 font-bold">★ ${f.rating}</span>
                        </div>
                        <p class="text-slate-600 text-sm italic">"${f.comment}"</p>
                    </div>
                `).join('')}
             </div>
        </div>
    `;
}

function renderProfile() {
    return `
        <div class="max-w-4xl mx-auto space-y-6">
            <h1 class="text-2xl font-bold text-slate-800">My Profile</h1>
            <div class="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                <div class="flex flex-col items-center text-center w-full md:w-auto">
                    <img src="${CURRENT_TRAINER.avatarUrl}" class="w-32 h-32 rounded-full border-4 border-slate-50 mb-4" />
                    <h2 class="text-xl font-bold text-slate-800">${CURRENT_TRAINER.name}</h2>
                    <p class="text-slate-500">${CURRENT_TRAINER.specialization}</p>
                </div>
                <div class="flex-1 space-y-4 w-full">
                    <div><label class="text-xs text-slate-500 uppercase font-bold">Bio</label><p class="text-slate-800">${CURRENT_TRAINER.bio}</p></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label class="text-xs text-slate-500 uppercase font-bold">Email</label><p class="text-slate-800">${CURRENT_TRAINER.email}</p></div>
                        <div><label class="text-xs text-slate-500 uppercase font-bold">Phone</label><p class="text-slate-800">${CURRENT_TRAINER.phone}</p></div>
                        <div><label class="text-xs text-slate-500 uppercase font-bold">Location</label><p class="text-slate-800">${CURRENT_TRAINER.location}</p></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- Router ---

function router() {
    const app = document.getElementById('app');
    const hash = window.location.hash || '';
    
    // Sidebar & Header Updates
    document.getElementById('sidebar-container').innerHTML = renderSidebar(hash);
    
    // Simple breadcrumb logic
    let breadcrumbs = [{name: 'Dashboard', url: '#'}];
    if (hash.startsWith('#events')) {
        breadcrumbs.push({name: 'My Events', url: '#events'});
        if (hash.split('/').length > 1) breadcrumbs.push({name: 'Detail', url: hash});
    } else if (hash.startsWith('#courses')) {
        breadcrumbs.push({name: 'My Courses', url: '#courses'});
        if (hash.split('/').length > 1) breadcrumbs.push({name: 'Detail', url: hash});
    } else if (hash.startsWith('#feedback')) {
        breadcrumbs.push({name: 'Feedback', url: '#feedback'});
    } else if (hash.startsWith('#profile')) {
        breadcrumbs.push({name: 'Profile', url: '#profile'});
    }
    
    document.getElementById('header-container').innerHTML = renderHeader(breadcrumbs);

    // Route Matching
    if (hash === '') {
        app.innerHTML = renderDashboard();
    } else if (hash === '#events') {
        app.innerHTML = renderEvents();
    } else if (hash.startsWith('#events/')) {
        const id = hash.split('/')[1];
        app.innerHTML = renderEventDetail(id);
    } else if (hash === '#courses') {
        app.innerHTML = renderCourses();
    } else if (hash.startsWith('#courses/')) {
        const id = hash.split('/')[1];
        app.innerHTML = renderCourseDetail(id);
    } else if (hash === '#feedback') {
        app.innerHTML = renderFeedback();
    } else if (hash === '#profile') {
        app.innerHTML = renderProfile();
    } else {
        app.innerHTML = '<div class="p-10 text-center text-slate-400">Page not found</div>';
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
