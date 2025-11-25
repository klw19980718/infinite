---
title: "Benchmarks & Evaluation | Infinite Talk AI"
description: "Benchmarks of InfiniteTalk sparse-frame video dubbing on HDTF, CelebV-HQ, and EMTD, compared with traditional dubbing and audio-driven I2V baselines."
---

<!--
SEO TDK
Title (<60): Benchmarks & Evaluation | Infinite Talk AI
Description (<160): Benchmarks of InfiniteTalk sparse-frame video dubbing on HDTF, CelebV-HQ, and EMTD, compared with traditional dubbing and audio-driven image-to-video baselines plus ablations.
Keywords (<100): Infinite Talk AI, InfiniteTalk benchmarks, video dubbing metrics, Sync-C, Sync-D, FVD, CSIM
-->

# Benchmarks & Evaluation of InfiniteTalk

> How InfiniteTalk performs on standard video dubbing benchmarks, and what that means for real productions.

---

## 1. What we benchmark

InfiniteTalk is evaluated on three public datasets that cover both **talking-head** and **full-body** motion:

- **HDTF** – high-quality talking-head videos with rich facial dynamics.  
- **CelebV-HQ** – high-resolution celebrity clips with diverse poses and lighting.  
- **EMTD** – videos with full-body motion, used to test gesture and body–audio synchronization.

We compare InfiniteTalk against:

- **Traditional dubbing (mouth-only)**  
  - LatentSync  
  - MuseTalk  

- **Audio-driven image-to-video models**  
  - FantacyTalking  
  - Hallo3  
  - OmniAvatar  
  - MultiTalk  

To evaluate both visuals and synchronization, we track five automatic metrics:

- **FID** (↓) – per-frame visual quality  
- **FVD** (↓) – temporal coherence across frames  
- **Sync-C** (↑) – confidence score for lip–audio synchronization  
- **Sync-D** (↓) – distance for lip sync  
- **CSIM** (↑) – identity similarity between input and output

There is also a human study focused on:

- Lip sync  
- Head and body motion vs speech rhythm  
- Identity consistency  
- Overall naturalness

---

## 2. Traditional dubbing vs sparse-frame dubbing

Traditional dubbing systems like LatentSync and MuseTalk only inpaint a small region around the **mouth** and keep the rest of the frame unchanged. This has two consequences:

- Metrics such as FID/FVD can look very strong, because almost all pixels are copied from the original video.  
- Head and body motion never change, so the performance often feels disconnected from the new audio.

InfiniteTalk takes a different approach:

- It re-generates the **entire frame** in an audio-driven way.  
- Sparse keyframes from the original video act as anchors, preserving identity, emotional cadence, and camera trajectory.  
- As a result, lips, head, and upper body all move with the dubbed speech.

### 2.1 Quantitative results vs traditional dubbing

The following table summarizes the comparison between LatentSync, MuseTalk, and InfiniteTalk on HDTF, CelebV-HQ, and EMTD:

![Table 1 – Quantitative comparisons with traditional video dubbing models](https://cdn.infinitetalkai.org/lib/table1.png)

Key takeaways:

- InfiniteTalk achieves **stronger lip synchronization** (higher Sync-C, lower Sync-D) while animating the **whole frame**.  
- Mouth-only baselines show lower FID/FVD because they barely modify the video, but they cannot adjust head and body motion to match audio.

---

## 3. Audio-driven I2V vs InfiniteTalk

Audio-driven image-to-video models (FantacyTalking, Hallo3, OmniAvatar, MultiTalk) start from a single reference image and generate a whole video from audio. They perform well on short clips, but they tend to:

- Drift in **identity** and **style** as sequences become longer.  
- Struggle to keep both motion and appearance stable over time.

InfiniteTalk focuses on **video-to-video dubbing** instead of single-image animation. With its streaming architecture, context frames, and sparse keyframes, it:

- Keeps identity and background stable over long sequences.  
- Still produces strong lip and body sync.

### 3.1 Quantitative results vs I2V baselines

Below is the comparison between InfiniteTalk and audio-driven I2V models:

![Table 2 – Quantitative comparisons with audio-driven image-to-video models](https://cdn.infinitetalkai.org/lib/table2.png)

Reading this table:

- InfiniteTalk consistently delivers **competitive FID/FVD and CSIM**.  
- At the same time, it achieves **strong lip synchronization**, often matching or beating I2V baselines on Sync-C/Sync-D, despite solving the harder video-to-video dubbing problem.

---

## 4. Visual and human evaluation

Numbers only tell part of the story. The paper also presents visual comparisons and a human study.

### 4.1 Visual comparison

The figure below shows qualitative results comparing MuseTalk, LatentSync, and InfiniteTalk on several clips:

![Figure 6 – Visual comparison of traditional dubbing vs InfiniteTalk](https://cdn.infinitetalkai.org/lib/fig6.png)

What you can see:

- Mouth-only models keep the body frozen and often show local artifacts around the lips.  
- InfiniteTalk produces coordinated lip, head, and body movements that follow the dubbed audio, making the performance feel more natural.

### 4.2 Human study

In a human evaluation over EMTD:

- Participants ranked methods on lip sync, body sync, identity consistency, and overall naturalness.  
- InfiniteTalk received the **highest average ranking** for both lip sync and body motion alignment.  
- MuseTalk and LatentSync were limited by their inability to modify body motion at all.

For most production users, this means:  
if you care about **how the dubbing feels to watch**, the human study supports choosing InfiniteTalk-style full-frame dubbing over mouth-only edits.

---

## 5. Ablation on soft reference control (M0–M3)

Reference sampling strategy has a big impact on how strongly the model is “pulled” towards reference frames vs allowed to follow audio.

The paper evaluates four variants of InfiniteTalk on EMTD:

- **M0** – references from within the same chunk (very strong, local control).  
- **M1** – references from the first / last frame of each chunk (boundary locking).  
- **M2** – references from distant chunks (very weak control).  
- **M3** – references from neighboring chunks (balanced).

The quantitative results are summarized here:

![Table 3 – Ablation experiment results on EMTD](https://cdn.infinitetalkai.org/lib/table3.png)

Interpretation:

- M0 and M1 achieve good visual scores but tend to **over-constrain motion**, leading to stiffness or pose copying.  
- M2 allows freer motion but suffers from **identity and style drift**.  
- M3 offers the **best trade-off**, with strong lip sync and acceptable FID/FVD, and is used as the default soft reference control strategy.

For a deeper conceptual explanation of M0–M3 and soft reference control, see:

> `/lib/soft-reference-control`

---

## 6. Camera control benchmarks

In many real videos, the camera itself moves: slow pans, handheld shake, zoom in/out. The paper investigates how well InfiniteTalk can preserve camera motion.

Two plugin-style variants are tested:

1. **InfiniteTalk + SDEdit**  
   - Injects a noisy version of the source video trajectory into the generation process.  
   - Better reproduces subtle camera motion while keeping backgrounds stable.

2. **InfiniteTalk + Uni3C**  
   - Adds a ControlNet-like branch that explicitly controls camera motion.  
   - Matches motion, but sometimes struggles to preserve background appearance.

The qualitative comparison is shown below:

![Figure 7 – Camera control comparison (InfiniteTalk vs SDEdit vs Uni3C)](https://cdn.infinitetalkai.org/lib/fig7.png)

For product users, this section matters if you later expose advanced options like “preserve original camera motion” or “stabilize camera”.

---

## 7. How to interpret these benchmarks as a creator

Putting everything together:

- **Traditional dubbing (mouth-only)**  
  - Pros: strong scores on metrics that reward copying input pixels.  
  - Cons: body language cannot change; performances often feel mismatched to new audio.

- **Audio-driven I2V**  
  - Pros: full-frame motion from a single image.  
  - Cons: identity and style tend to drift on long videos; less suited to strict video-to-video dubbing.

- **InfiniteTalk (sparse-frame, streaming)**  
  - Re-generates the whole frame while anchoring identity and camera via keyframes.  
  - Uses a streaming architecture and soft reference control to stay stable over long sequences.  
  - Achieves strong lip and body sync on public benchmarks and in human evaluations.

For your own content, this means:

- If you care about **natural, full-frame performances** that match the dubbed voice, InfiniteTalk’s design and metrics support that goal.  
- If you care about **long-form series, courses, or episodes**, its streaming architecture and reference control are built for that regime, not just short demos.

For more details on how the system works internally, you can continue with:

- `/lib/sparse-frame-video-dubbing` – the overall dubbing paradigm.  
- `/lib/infinite-length-streaming-architecture` – how InfiniteTalk handles long sequences.  
- `/lib/soft-reference-control` – how reference sampling shapes stability and motion.
