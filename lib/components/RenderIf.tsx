import React from "react";

export default function RenderIf({cond, children}: { cond: boolean | undefined, children: React.ReactNode }) {
    return cond ? <>{children}</> : null
}