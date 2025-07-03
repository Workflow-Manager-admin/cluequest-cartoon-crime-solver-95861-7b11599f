# Freepik Cartoon Crime Mystery Game Assets (Hard Mode) — Integration Guide

_**Theme:** Flat 2D, bold colors, clean lines, transparent backgrounds.  
**License:** Free for commercial use with attribution ([see Freepik license per image](https://www.freepik.com/about_us#nav-freepik-license)).  
**Note:** Use PNGs with transparency for best integration in game UI._

---

## 1. Crime Scene Illustrations (Challenging, Highly Illustrated)
**Description:** Busy, multi-layered cartoon interiors/locked rooms with visual clutter for hard mode.  
**Integration:** Assign to `CRIME_SCENE_IMAGE` in App.js.

- **[Cartoon Detective Investigating Crime Scene (Very Detailed)](https://www.freepik.com/free-vector/detective-investigating-murder-crime-scene_24640459.htm)**
  - URL: https://www.freepik.com/free-vector/detective-investigating-murder-crime-scene_24640459.htm
  - Download (PNG, vector, attribution: upklyak)
  - Features: Multiple rooms, police tape, objects to hide clues.

- **[Modern Cartoon Living Room Crime Scene (Alternate)](https://www.freepik.com/free-vector/modern-interior-living-room_24688296.htm)**
  - URL: https://www.freepik.com/free-vector/modern-interior-living-room_24688296.htm
  - Downloadable vector/PNG (attribution: upklyak)
  - Highly detailed, good for hidden clue overlays.

---

## 2. Hidden Clue Icons/Illustrations (Complex, Detailed)
**Description:** Challenging-to-spot clue icons; cartoon/flat style; PNG preferred.  
**Integration:**  
- Use in `CLUE_ICONS` array and for overlays.
- Recommend adapting asset sizes for overlay visibility.

- **[Bloody Knife Cartoon Icon - Flat PNG](https://www.freepik.com/free-icon/knife_1489972.htm)**
  - URL: https://www.freepik.com/free-icon/knife_1489972.htm
  - Attribution: Freepik
  - PNG/icon, classic murder weapon; place in scene (edge of sofa, under table, etc.)

- **[Cartoon Fingerprint Icon (Flat)](https://www.freepik.com/free-icon/fingerprint_318-740317.htm)**
  - URL: https://www.freepik.com/free-icon/fingerprint_318-740317.htm
  - Attribution: Freepik
  - Use for fingerprint found on window/object.

- **[Gold Watch — Cartoon Flat Style](https://www.freepik.com/free-icon/watch_2058877.htm)**
  - URL: https://www.freepik.com/free-icon/watch_2058877.htm
  - Attribution: Freepik
  - As “dropped clue”, can overlay anywhere in room.

- **[Blood Stain/Spatter Flat Icon](https://www.freepik.com/free-icon/blood-stain_952007.htm)**
  - URL: https://www.freepik.com/free-icon/blood-stain_952007.htm
  - Attribution: Freepik
  - For small, subtle overlays (hard to spot).

- **[Cartoon Key Icon (Flat)](https://www.freepik.com/free-icon/key_2941735.htm)**
  - URL: https://www.freepik.com/free-icon/key_2941735.htm
  - Attribution: Freepik
  - Hidden “key” clue, classic for locked-room scenario.

---

## 3. Suspect Illustrations (Highly Detailed, Distinctive Cartoons)
**Description:** Visually diverse suspects, varied genders/roles, bold costumes, cartoon style.  
**Integration:**  
- Use in `SUSPECT_IMAGES` array, mapped by index or ID in mockSuspects.

- **[Cartoon Police Officer (Male, Flat Style)](https://www.freepik.com/free-vector/policeman-character-design_1308-102774.htm)**
  - URL: https://www.freepik.com/free-vector/policeman-character-design_1308-102774.htm
  - Attribution: pch.vector

- **[Cartoon Female Chef Character](https://www.freepik.com/free-vector/cartoon-female-chef-character-illustration_1308-133287.htm)**
  - URL: https://www.freepik.com/free-vector/cartoon-female-chef-character-illustration_1308-133287.htm
  - Attribution: pch.vector

- **[Male Thief/Burglar Suspect (Cartoon)](https://www.freepik.com/free-vector/hand-drawn-cartoon-thief-character_1308-133295.htm)**
  - URL: https://www.freepik.com/free-vector/hand-drawn-cartoon-thief-character_1308-133295.htm
  - Attribution: pch.vector

- **[Cartoon Old Lady Suspect (Flat, Distinctive)](https://www.freepik.com/free-vector/old-lady-character_1308-133288.htm)**
  - URL: https://www.freepik.com/free-vector/old-lady-character_1308-133288.htm
  - Attribution: pch.vector

- **[Cartoon Young Man with Glasses (Nerdy Look)](https://www.freepik.com/free-vector/young-man-character_1308-144883.htm)**
  - URL: https://www.freepik.com/free-vector/young-man-character_1308-144883.htm
  - Attribution: pch.vector

---

## 4. Integration Mapping (For Developers)

| Game Element      | Freepik Asset URL                                                                              | Suggested JS Constant                |
|-------------------|------------------------------------------------------------------------------------------------|--------------------------------------|
| Crime Scene       | https://www.freepik.com/free-vector/detective-investigating-murder-crime-scene_24640459.htm     | CRIME_SCENE_IMAGE                    |
| Knife (Clue)      | https://www.freepik.com/free-icon/knife_1489972.htm                                            | CLUE_ICONS[0]                        |
| Fingerprint       | https://www.freepik.com/free-icon/fingerprint_318-740317.htm                                   | CLUE_ICONS[1]                        |
| Gold Watch        | https://www.freepik.com/free-icon/watch_2058877.htm                                            | CLUE_ICONS[2]                        |
| Blood Stain       | https://www.freepik.com/free-icon/blood-stain_952007.htm                                       | CLUE_ICONS[3]                        |
| Key (Clue)        | https://www.freepik.com/free-icon/key_2941735.htm                                              | CLUE_ICONS[4]                        |
| Suspect: Police   | https://www.freepik.com/free-vector/policeman-character-design_1308-102774.htm                 | SUSPECT_IMAGES[0]                    |
| Suspect: Chef     | https://www.freepik.com/free-vector/cartoon-female-chef-character-illustration_1308-133287.htm | SUSPECT_IMAGES[1]                    |
| Suspect: Burglar  | https://www.freepik.com/free-vector/hand-drawn-cartoon-thief-character_1308-133295.htm         | SUSPECT_IMAGES[2]                    |
| Suspect: Old Lady | https://www.freepik.com/free-vector/old-lady-character_1308-133288.htm                         | SUSPECT_IMAGES[3]                    |
| Suspect: Nerdy Guy| https://www.freepik.com/free-vector/young-man-character_1308-144883.htm                        | SUSPECT_IMAGES[4]                    |

---

## 5. Attribution Requirements

> **Freepik assets used under: [Free for commercial use with attribution license](https://www.freepik.com/about_us#nav-freepik-license)**
> 
> Attribution example (place on credits page/modal):  
> _"Cartoon illustrations & icons by Freepik, upklyak, pch.vector on freepik.com"_

---

## 6. Additional Tips

- Download PNG (with transparency) or export vector (SVG).
- For harder modes, prefer scenes with more clutter/objects and add subtle clue overlays.
- Clues can be disguised as part of the room, requiring close observation.
- Serve asset images from /assets for better caching/offline use if permitted.
- Always check license details prior to shipping.

---

**End of Guide**
