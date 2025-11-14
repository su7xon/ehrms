module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DB",
    ()=>DB,
    "default",
    ()=>__TURBOPACK__default__export__
]);
const DB = globalThis.DB || {
    employees: [
        {
            id: "emp_001",
            name: "Asha Sharma",
            avatar: "https://i.pravatar.cc/150?img=32",
            department: "Health",
            designation: "Staff Nurse",
            salaryComponents: {
                basic: 50000,
                hra: 15000,
                da: 10000,
                allowances: 0,
                pfPercent: 12,
                tdsPercent: 0,
                otherDeductions: 0
            }
        },
        {
            id: "emp_002",
            name: "Ravi Kumar",
            avatar: "https://i.pravatar.cc/150?img=12",
            department: "Education",
            designation: "Assistant Teacher",
            salaryComponents: {
                basic: 30000,
                hra: 9000,
                da: 5000,
                allowances: 2000,
                pfPercent: 12,
                tdsPercent: 0,
                otherDeductions: 0
            }
        },
        {
            id: "emp_003",
            name: "Priya Singh",
            avatar: "https://i.pravatar.cc/150?img=45",
            department: "IT",
            designation: "Software Developer",
            salaryComponents: {
                basic: 75000,
                hra: 22500,
                da: 15000,
                allowances: 5000,
                pfPercent: 12,
                tdsPercent: 5,
                otherDeductions: 1000
            }
        },
        {
            id: "emp_004",
            name: "Vikram Patel",
            avatar: "https://i.pravatar.cc/150?img=23",
            department: "Finance",
            designation: "Accountant",
            salaryComponents: {
                basic: 45000,
                hra: 13500,
                da: 9000,
                allowances: 1500,
                pfPercent: 12,
                tdsPercent: 0,
                otherDeductions: 500
            }
        },
        {
            id: "emp_005",
            name: "Neha Gupta",
            avatar: "https://i.pravatar.cc/150?img=67",
            department: "Administration",
            designation: "Office Manager",
            salaryComponents: {
                basic: 40000,
                hra: 12000,
                da: 8000,
                allowances: 2000,
                pfPercent: 12,
                tdsPercent: 0,
                otherDeductions: 0
            }
        }
    ],
    generatedSlips: [],
    lastAudit: null
};
if (!globalThis.DB) {
    globalThis.DB = DB;
}
const __TURBOPACK__default__export__ = DB;
}),
"[project]/app/api/payroll/list/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        employees: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DB"].employees.map((e)=>({
                id: e.id,
                name: e.name,
                department: e.department,
                designation: e.designation,
                avatar: e.avatar,
                salaryComponents: e.salaryComponents
            }))
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5a995c62._.js.map