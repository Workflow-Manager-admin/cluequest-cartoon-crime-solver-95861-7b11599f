# Freepik Cartoon Crime Mystery Game Assets (Hard Mode) — Integration Guide

_**Theme:** Flat 2D, bold colors, clean lines, transparent backgrounds.  
**License:** Free for commercial use with attribution ([check Freepik license per image]).  
**Note:** Use PNGs with transparency for best integration in game UI._

---

## 1. Crime Scene Illustrations (Challenging, Highly Illustrated)
**Description:** Busy, detailed cartoon interiors or locked rooms.  
**Integration:** Assign to `CRIME_SCENE_IMAGE` in App.js.

- **[Cartoon Interior Crime Scene (Highly Detailed)](https://www.freepik.com/free-vector/detective-investigating-murder-crime-scene_24640459.htm)**
  - URL: https://www.freepik.com/free-vector/detective-investigating-murder-crime-scene_24640459.htm
  - [Direct PNG Download (check vector exports for transparent BG)]
  - Author: upklyak
  
- **[Modern Cartoon Living Room w/ Details](https://www.freepik.com/free-vector/modern-interior-living-room_24688296.htm)**
  - URL: https://www.freepik.com/free-vector/modern-interior-living-room_24688296.htm
  - For “locked room” context: busy, lots of places to hide clues.
  - Author: upklyak

---

## 2. Hidden Clue Icons/Illustrations (Complex, Detailed)
**Description:** Detectable but challenging to spot “clue” items; flat style.  
**Integration:**  
- Use as items in `CLUE_ICONS` and for clue overlays.  
- Prefer PNGs with transparent backgrounds.

- **[Bloody Knife Cartoon Icon - PNG, Flat Style](https://www.freepik.com/free-icon/knife_1489972.htm)**
  - URL: https://www.freepik.com/free-icon/knife_1489972.htm
  - License: Free (requires attribution)
  - Author: Freepik

- **[Cartoon Fingerprint Icon Flat 2D](https://www.freepik.com/free-icon/fingerprint_318-740317.htm)**
  - URL: https://www.freepik.com/free-icon/fingerprint_318-740317.htm
  - Author: Freepik

- **[Cartoon Wristwatch Icon (Gold Watch, clue)](https://www.freepik.com/free-icon/watch_2058877.htm)**
  - URL: https://www.freepik.com/free-icon/watch_2058877.htm
  - Author: Freepik

---

## 3. Suspect Illustrations (Diverse, Highly Illustrated)
**Description:** Diverse cartoon characters, suspects with distinct features and bold colors.  
**Integration:**  
- Use for `SUSPECT_IMAGES` array; map to suspect objects.

- **[Cartoon Police Officer Suspect, Flat PNG](https://www.freepik.com/free-vector/policeman-character-design_1308-102774.htm)**
  - URL: https://www.freepik.com/free-vector/policeman-character-design_1308-102774.htm
  - Author: pch.vector

- **[Cartoon Female Chef Suspect, Flat PNG](https://www.freepik.com/free-vector/cartoon-female-chef-character-illustration_1308-133287.htm)**
  - URL: https://www.freepik.com/free-vector/cartoon-female-chef-character-illustration_1308-133287.htm
  - Author: pch.vector

- **[Cartoon Male Thief/Burglar Suspect, Flat PNG](https://www.freepik.com/free-vector/hand-drawn-cartoon-thief-character_1308-133295.htm)**
  - URL: https://www.freepik.com/free-vector/hand-drawn-cartoon-thief-character_1308-133295.htm
  - Author: pch.vector

---

## 4. Integration Mapping (For Developers)

| Game Element     | Freepik Asset URL                                                                           | Suggested JS Constant                          |
|------------------|--------------------------------------------------------------------------------------------|------------------------------------------------|
| Crime Scene      | https://www.freepik.com/free-vector/detective-investigating-murder-crime-scene_24640459.htm | CRIME_SCENE_IMAGE                              |
| Bloody Knife     | https://www.freepik.com/free-icon/knife_1489972.htm                                         | CLUE_ICONS[1]                                  |
| Fingerprint      | https://www.freepik.com/free-icon/fingerprint_318-740317.htm                                | CLUE_ICONS[0]                                  |
| Gold Watch       | https://www.freepik.com/free-icon/watch_2058877.htm                                         | CLUE_ICONS[2]                                  |
| Suspect: Police  | https://www.freepik.com/free-vector/policeman-character-design_1308-102774.htm              | SUSPECT_IMAGES[0]                              |
| Suspect: Chef    | https://www.freepik.com/free-vector/cartoon-female-chef-character-illustration_1308-133287.htm | SUSPECT_IMAGES[1]                           |
| Suspect: Burglar | https://www.freepik.com/free-vector/hand-drawn-cartoon-thief-character_1308-133295.htm      | SUSPECT_IMAGES[2]                              |

---

## 5. Attribution Requirements

> **Freepik assets used under: [Free for commercial use with attribution license](https://www.freepik.com/about_us#nav-freepik-license)**
> 
> Attribution example (place on credits page/modal):  
> _"Cartoon illustrations & icons by Freepik, upklyak, pch.vector on freepik.com"_

---

## 6. Additional Tips

- Download the PNG (if available with transparent BG), or export vector with transparent BG.
- For “hard” mode, prefer assets with clutter, detail, and multiple visual elements.
- Clues can be cropped/placed in subtle spots in the crime scene backgrounds.
- For integration, copy the direct PNG/JPG URL or serve locally.
- Optionally, store in `/assets/` for guaranteed availability.

---

**End of Guide**
