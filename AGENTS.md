
# AGENTS.md — AULA STEM BOLIVIA | CBA SCIENCE

## ROLE
Act as a senior frontend developer and software architect.
Build a modular educational platform for CBA Science in Santa Cruz, Bolivia.

## PROJECT IDENTITY
- Project: Aula STEM Bolivia
- Organization: CBA Science
- Team: CBA Science NASA HERC Team
- Audience: Secondary school students and teachers in Bolivia.
- Purpose: Transform STEM experiences and engineering knowledge into accessible educational resources.

Do not imply official NASA endorsement or partnership unless verified and authorized.

## TECHNOLOGY
- HTML5
- CSS3
- Vanilla JavaScript ES Modules
- Git and GitHub

Do not introduce React, TypeScript or frameworks without approval.

## CONTENT PRIORITIES
- 50% STEM Educational Hub.
- 30% Outreach and educational activities.
- 20% Team and engineering project.

## NAVIGATION
- Inicio
- Áreas
- IA en el aula
- Charlas y feria
- Colaboradores
- Login (frontend structure only).

## VISUAL IDENTITY
Colors:
- Navy Night: #102A56
- Navy Deep: #174A8B
- Blue Mid: #3478C8
- Blue Light: #DCEBFF

Typography:
- Poppins: primary.
- Harmonie: accent with sans-serif fallback.

Design:
- Mobile-first.
- Minimalist, professional and aerospace-inspired.
- Accessible contrast.
- Responsive layouts.
- Print-friendly educational worksheets.

## REQUIRED FEATURES

### Home
Hero: "Llevá experiencias STEM a tu aula".

Three main entry points:
1. Integrantes del equipo NASA HERC.
2. Aprendizaje basado en experiencias.
3. CBA Science NASA HERC Team · Actividades.

### STEM Resources
Categories:
- Matemáticas
- Física
- Química
- Robótica
- Astronomía

Each resource should include:
- Suggested school level.
- Duration.
- Materials.
- Así lo aprendí.
- Probalo en tu aula.
- IA en el aula.
- Print-friendly functionality.

### Outreach
Include:
- January and February 2027 activities.
- School visits.
- Talks.
- Clubs.
- STEM Fair on February 18, 2027.
- Activity location, topic, resource and credits.

### Team
Include member profiles and experience stories.
Support images, sketches and notebook evidence.
Separate original authorship from pedagogical adaptation.

### Engineering
Include research, design, CAD, testing and technical documentation.

### EXPERIENCE SUBMISSION
Create a four-step frontend workflow:
1. Experience type.
2. Reflection questions and optional evidence.
3. Department and credits.
4. Review notice and confirmation.

No real backend or permanent file storage is assumed.

## DATA ARCHITECTURE
Create:
- js/data/activities.js
- js/data/resources.js
- js/data/members.js

Keep data separate from HTML.
Use concise and reusable JavaScript structures.

## DEVELOPMENT RULES
- Inspect the repository before editing.
- Preserve existing working code.
- Avoid duplicate CSS and JavaScript.
- Reuse components.
- Use semantic HTML.
- Check relative paths.
- Validate navigation and links.
- Do not invent names, achievements or activity results.
- Use labeled placeholders when information is missing.
- Do not implement real authentication without an approved backend.

## WORKFLOW
Before implementation:
1. Inspect existing files.
2. Identify missing files.
3. Explain the plan briefly.
4. Avoid modifying unrelated files.

After implementation:
1. List created and modified files.
2. Identify missing information.
3. Report incomplete backend functionality.
4. Test navigation and responsiveness.

Work in small, verifiable phases.
Avoid unnecessary explanations and duplicated code.

## VISUAL QUALITY AND INTERACTIONS

The website must have a polished, professional, high-quality visual identity.

Do not create generic school-template layouts or basic unstyled sections.

### Visual direction
- Modern aerospace and science-inspired aesthetic.
- Premium educational technology platform.
- Strong visual hierarchy and editorial composition.
- High-quality photography and relevant scientific imagery.
- Consistent use of the established brand palette.
- Carefully balanced whitespace and typography.
- Visually interesting sections with varied layouts.

### Animations and interactions
Use animations and transitions where they improve the experience:
- Hero entrance animations.
- Smooth scrolling.
- Scroll-triggered section reveals.
- Subtle card hover effects.
- Button microinteractions.
- Image hover transitions.
- Animated statistics only when verified data exists.
- Subtle scientific or aerospace-inspired decorative motion.

### Technical requirements
- Prefer CSS animations and transitions.
- Use IntersectionObserver for scroll-triggered reveals when appropriate.
- Use SVG for lightweight scientific illustrations.
- Avoid unnecessary dependencies and heavy animation libraries.
- Respect prefers-reduced-motion.
- Ensure animations do not interfere with accessibility or performance.
- Keep the website responsive and optimized for mobile devices.

### Image requirements
- Use relevant, high-quality images.
- Avoid generic or unrelated stock photography.
- Preserve image aspect ratios and use appropriate object-fit.
- Include descriptive alt text.
- Do not use copyrighted logos or imply unauthorized NASA endorsement.
- Prefer authorized project photographs and original illustrations where available.
- Use clearly identified placeholders when actual photographs are unavailable.

### Design quality assurance
Before completing each page:
- Check spacing, typography, contrast and alignment.
- Verify hover, focus and active states.
- Test animations on mobile and desktop.
- Check that no content overlaps.
- Ensure the result feels cohesive and professionally designed.
## OFFICIAL VISUAL DIRECTION — AULA STEM BOLIVIA

The approved visual direction is:

HYBRID AEROSPACE + MODERN EDTECH
DARK VISUAL PREDOMINANCE

### 1. BRAND PERSONALITY
The platform must communicate:
- Scientific curiosity.
- Innovation and exploration.
- Engineering and technological excellence.
- Educational accessibility.
- Professionalism and credibility.

The website must feel like a premium aerospace-inspired educational technology platform, not a generic school website.

### 2. COLOR SYSTEM

Preserve the official brand colors:

- Navy Night: #102A56
- Navy Deep: #174A8B
- Blue Mid: #3478C8
- Blue Light: #DCEBFF

Use Navy Night as the main background.
Use Navy Deep for secondary surfaces and cards.
Use Blue Mid for interactive elements and primary actions.
Use Blue Light for highlighted text, borders and visual accents.

Create additional neutral variables for:
- Main text.
- Secondary text.
- Muted text.
- Card surfaces.
- Borders.
- Focus states.

Do not introduce unrelated bright colors without a clear functional reason.

### 3. DARK VISUAL DESIGN

Use:
- Deep navy backgrounds.
- Subtle blue gradients.
- Layered surfaces.
- Soft borders.
- Controlled blue highlights.
- High-contrast typography.
- Carefully balanced whitespace.

Avoid:
- Excessive neon effects.
- Excessive glow and shadows.
- Pure black backgrounds everywhere.
- Repetitive card layouts.
- Overcrowded sections.

Light surfaces are allowed when they improve educational content readability, diagrams, worksheets or printing.

### 4. AEROSPACE VISUAL LANGUAGE

Use visual references inspired by:
- Space exploration.
- Engineering interfaces.
- Scientific instrumentation.
- Orbital trajectories.
- Technical diagrams.
- Satellite and planetary imagery.
- Research and experimentation.

Use original SVG graphics and authorized photographs whenever possible.

Do not use NASA logos or imply official NASA endorsement without authorization.

### 5. LAYOUT AND COMPOSITION

Use:
- Large editorial headlines.
- Strong hero compositions.
- Asymmetric layouts where appropriate.
- Large high-quality images.
- Clear section transitions.
- Layered visual elements.
- Consistent spacing and alignment.

Avoid making every section look identical.

### 6. MOTION AND INTERACTION

Use polished, purposeful motion:
- Hero entrance sequences.
- Scroll-triggered reveals.
- Smooth navigation.
- Subtle parallax only when appropriate.
- Card hover interactions.
- Image transitions.
- Animated SVG details.
- Button microinteractions.

Use CSS animations and transitions first.
Use IntersectionObserver where appropriate.
Respect prefers-reduced-motion.
Prioritize performance and accessibility.

### 7. PHOTOGRAPHY AND GRAPHICS

Prioritize:
1. Real photographs of CBA Science activities and team projects.
2. Relevant scientific and aerospace photography.
3. Original illustrations and diagrams.
4. Clearly identified placeholders where real assets are unavailable.

Never use unrelated stock imagery just to fill space.

### 8. PAGE-BY-PAGE CONSISTENCY

Every page must follow this visual direction while adapting its layout to its purpose.

Educational resources must prioritize readability.
Outreach pages must prioritize activities and community.
Team pages must prioritize people and their work.
Engineering pages must prioritize technical content and project documentation.

### 9. QUALITY STANDARD

Before approving any page, evaluate:
- Visual quality.
- Composition.
- Typography.
- Color contrast.
- Image quality.
- Responsive behavior.
- Animation quality.
- Accessibility.
- Performance.

Do not consider a page complete merely because its code works. It must also meet the approved visual standard.