#!/usr/bin/env python3
"""Generate per-scene voiceover with Piper, auto-fitting each clip to its scene
duration. Writes public/vo/voNN.wav and prints a fit report."""
import subprocess, os, json, wave, contextlib, sys

FPS = 30
MODEL = "voices/en-us-lessac-medium.onnx"
CFG = "voices/en-us-lessac-medium.onnx.json"
OUT = "public/vo"
os.makedirs(OUT, exist_ok=True)

# (scene_index, duration_frames, narration). Acronyms spelled for the TTS.
SCENES = [
 (1, 460, "Kerala is not just a coastline. It is a circuit, and a mine, waiting for its architect to return. This is K S I E P, the Kerala Sovereign Infrastructure Electronics Platform."),
 (2, 600, "It begins with one man. K P P Nambiar never thought in terms of companies. He thought in terms of institutions: systems designed to outlast their founders, and to serve a state and a country. He gave Kerala its electronics brand, Keltron."),
 (3, 640, "Read his work correctly, and he never built mere buildings. Keltron was an electronics ecosystem. E R D C, a technology capability engine. Technopark, a knowledge economy platform. And the women's co-operatives, a social architecture for distributed participation."),
 (4, 780, "Across fifty three years, Kerala built three great institutions. Keltron, E R D C, and Technopark. But it never reconnected them. This is the how of K P P Nambiar two point oh. K S I E P reconnects research, manufacturing, entrepreneurship and strategic technology into one enduring architecture. And it adds two new models: the governance of C I A L, and the participation of Kudumbashree. There is no better teacher than history in determining the future."),
 (5, 620, "Why now? Geopolitical instability and supply chain shocks can spike the price of the entire electronics value chain. Owning a share of it is critical for India. It sits inside critical infrastructure, A I infrastructure, telecom and data centres, and defence. We move the Kerala horse to the centre of the board. Attack is the best form of defence."),
 (6, 640, "And the opportunity is vast. India's reliability electronics market is worth eight to twelve billion dollars. But six to nine billion of it is imported, with only two to three billion of domestic value add. That import gap is the strategic opening."),
 (7, 500, "So what is K S I E P? A Sovereign Infrastructure Electronics Platform. A Technopark for electronics. A durable capability layer for Kerala and India, in tune with India's sovereign electronics mission."),
 (8, 520, "Its purpose: to build a globally competitive, innovation driven ecosystem. One that enables inclusive development across Kerala, strengthens India's technological sovereignty, generates high value employment, and fosters entrepreneurship."),
 (9, 600, "The goal is world class depth across every layer. Material and component depth, timing, and infrastructure systems. Plus a reliability intelligence layer that does not exist anywhere today. Because K S I E P is not a company. It is an electronics ecosystem platform."),
 (10, 660, "It rests on six inheritances Kerala already invented. Keltron's technology base. E R D C's research. Technopark's ecosystem. C I A L's capital and governance. Kudumbashree's distributed entrepreneurship. And Germany's Mittelstand model of specialised, small firm industry."),
 (11, 700, "And every layer of the stack is assured. From advanced materials, through timing, energy storage and power integrity, up to the A I intelligence layer. Each one carries its own guarantee of reliability. The passive electronics stack rests assured."),
 (12, 600, "Now, the metaphor. A mine is not the gems. It is the presence of every ingredient in one place. Kerala's seams are already proven. I S R O's space electronics. The Vizhinjam deep water port. A manufacturing base. Talent. And patient capital."),
 (13, 600, "And that expertise is distributed across the state. Existing Keltron units, in Kannur, Malappuram, Thrissur, Kochi and Trivandrum, become the nuclei of regional small business clusters. One state, many specialised regions."),
 (14, 640, "Then comes the cut and polish. No single firm cuts the whole stone. Each small company masters one facet, the Mittelstand way, on shared wheels no firm could afford alone. And the master cutters are Gulf returned engineers, handed a bench and a first order."),
 (15, 660, "And these are the diamonds from the Keltron mine. Telecom synchronization. A I data centre reliability. Grid stability. Defence timing. And critical infrastructure resilience. The world's first reliability infrastructure electronics platform."),
 (16, 600, "A working mine builds a town. Around the anchors grow fifty to a hundred and fifty new companies. Jobs, start ups, product firms, manufacturing entrepreneurs and women founders. Sixty thousand livelihoods, and thousands of apprentices, within the decade."),
 (17, 640, "To capitalise the mine, the ask is five hundred crore. Staged, gate by gate. It funds the cutting houses, the procurement, the returnee founders, the training, and the research bridge. You don't buy the gems. You fund the mine, and the wheels."),
 (18, 620, "It is owned widely, and built to endure. The C I A L way of professional, politically continuous governance. And the Kudumbashree way of distributed participation. Backed by strategic anchor investors from Kerala's global diaspora."),
 (19, 540, "It is run on a simple policy. A: attract good people. B: build institutions that endure. C: keep a common good focus, always. D: distribute development and shared wealth across the state."),
 (20, 600, "And here is the thesis. You are turning a sovereign infrastructure electronics platform for India, into a balance sheet asset for Kerala. Not capital mobilization, but an enduring institution. An old Kerala idea, applied to a far larger ambition."),
 (21, 540, "By twenty thirty five, Kerala is recognised as India's leader for sovereign electronics. A global centre for reliability engineering. A talent hub. And a model for women led manufacturing. Building a better tomorrow for Kerala."),
 (22, 680, "The ambition was Nambiar's. The cut is ours. K S I E P. A new institutional architecture for Kerala's next twenty five years. The architect returns."),
]

def dur(path):
    with contextlib.closing(wave.open(path,'r')) as w:
        return w.getnframes()/float(w.getframerate())

def synth(text, out, length_scale):
    subprocess.run(["piper","-m",MODEL,"-c",CFG,"-f",out,
                    "--length-scale",str(length_scale),"--sentence-silence","0.25"],
                   input=text.encode(), stdout=subprocess.DEVNULL,
                   stderr=subprocess.DEVNULL, check=True)

report=[]
for idx, frames, text in SCENES:
    budget = frames/FPS - 0.6          # leave a little tail before the cut
    out = f"{OUT}/vo{idx:02d}.wav"
    ls = 1.0
    synth(text, out, ls)
    d = dur(out)
    if d > budget:                      # speed up to fit
        ls = max(0.72, (budget/d) * ls * 0.99)
        synth(text, out, ls)
        d = dur(out)
    report.append((idx, round(frames/FPS,1), round(d,1), round(ls,2)))
    print(f"scene {idx:02d}: budget {frames/FPS:5.1f}s  vo {d:5.1f}s  scale {ls:.2f}", file=sys.stderr)

print("OK", len(report), "clips")
