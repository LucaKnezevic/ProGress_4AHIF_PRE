"use client";

import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

const MEMBER_ID = "PG-0001";
const MEMBER_NAME = "Luca Knezevic";

export default function StudiozugangPage() {
  const [copied, setCopied] = useState(false);

  const qrValue = JSON.stringify({
    memberId: MEMBER_ID,
    name: MEMBER_NAME,
    gym: "ProGress",
    valid: true,
  });

  function handleCopy() {
    navigator.clipboard.writeText(MEMBER_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <Container>
      <SectionTitle
        title="Studiozugang"
        subtitle="Digitale Mitgliedskarte"
      />

      <div className="grid gap-3">
        <Card>
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/15 text-xl">
              ✅
            </div>
            <div>
              <p className="text-xs text-white/40">Mitglied</p>
              <p className="font-semibold text-white">{MEMBER_NAME}</p>
              <div className="mt-1 flex gap-2">
                <button
                  onClick={handleCopy}
                  className="rounded-lg bg-white/[0.06] px-2 py-0.5 text-xs text-white/60 transition hover:bg-white/10 active:scale-95"
                >
                  {copied ? "Kopiert ✓" : MEMBER_ID}
                </button>
                <span className="rounded-lg bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400 font-medium">Aktiv</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-center py-4">
            <p className="text-xs text-white/40 mb-4">QR-Code scannen für Studiozugang</p>
            <div className="mx-auto inline-flex rounded-2xl bg-white p-4">
              <QRCodeSVG
                value={qrValue}
                size={180}
                level="H"
                bgColor="#ffffff"
                fgColor="#1e1b4b"
              />
            </div>
            <p className="mt-3 text-xs text-white/30">
              Mitglieds-ID: {MEMBER_ID}
            </p>
          </div>
        </Card>
      </div>
    </Container>
  );
}
