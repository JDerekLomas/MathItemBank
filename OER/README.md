# Open Educational Resources (OER) for K-12 Mathematics

This directory contains open educational resources for K-12 mathematics, particularly item banks and assessment materials. All resources are available under open licenses (Creative Commons, MIT, or AGPL).

## Contents

### 1. Khan Academy Exercises (`KhanAcademy/`)

**Source:** https://github.com/Khan/khan-exercises

**Description:** A comprehensive collection of 453 interactive math exercises covering topics from elementary to high school mathematics.

**License:**
- Exercise framework: MIT License
- Exercise content: Creative Commons BY-NC-SA 3.0

**Topics Covered:**
- Elementary: Addition, subtraction, multiplication, division, fractions, decimals
- Middle School: Integers, rational numbers, ratios, proportions, basic algebra
- High School: Algebra (polynomials, rational expressions, systems), Geometry (angles, area, circles, triangles), Trigonometry, Precalculus, Calculus

**Format:** HTML files with interactive JavaScript-based exercises

**Sample Exercises:**
- `absolute_value_equations.html`
- `adding_and_subtracting_fractions.html`
- `area_of_a_circle.html`
- `graphing_parabolas_2.html`
- `trigonometry_1.html`

**Status:** While no longer actively developed at Khan Academy (replaced by Perseus), these exercises remain fully functional and represent a high-quality set of K-12 math practice problems.

**Total Size:** 21 MB

---

### 2. OpenStax Exercises (`OpenStax/`)

**Source:** https://github.com/openstax/exercises

**Description:** OpenStax Exercises is an open homework and test question bank where questions are written by the community. This is the successor to Quadbase and provides a database-driven system for creating and managing assessment items.

**License:** GNU Affero General Public License v3.0 (AGPL-3.0)

**Features:**
- Community-contributed question bank
- Database-driven exercise management
- API for accessing exercises
- Ruby on Rails application for exercise creation and management

**Format:** Rails application with database schema for storing exercises

**Topics:** Primarily college-level mathematics aligned with OpenStax textbooks, but includes foundational topics relevant to advanced K-12 students

**Total Size:** 8.1 MB

---

## Additional Resources Identified (Not Yet Downloaded)

### 3. Mathematics Assessment Project (MAP)

**Website:** https://www.map.mathshell.org

**Description:**
- 100 formative assessment lessons (downloadable as PDFs)
- 94 summative assessment tasks with rubrics
- Professional development modules

**License:** Creative Commons Attribution, Non-commercial, No Derivatives License 3.0

**Note:** Individual lessons and tasks can be downloaded from the website. Sample files include:
- Formative Assessment Guide
- Grade-level specific lessons for middle and high school

---

### 4. Illustrative Mathematics

**Website:** https://illustrativemathematics.org

**Description:** Problem-based core curriculum for grades K-12

**License:** Creative Commons Attribution 4.0 (CC BY 4.0) for most content

**Access:** Materials available at AccessIM.org

---

### 5. Smarter Balanced Assessment Consortium (SBAC)

**Website:** https://sampleitems.smarterbalanced.org

**Description:** Sample test items for grades 3-8 and high school mathematics

**License:** Copyright by The Regents of the University of California (check specific terms)

**Content:** 104+ released test questions from summative assessments

---

## Usage Notes

### Khan Academy Exercises

To view Khan Academy exercises locally:

```bash
cd KhanAcademy
python3 -m http.server
```

Then navigate to `http://localhost:8000/exercises/` and select any HTML file to see an interactive exercise.

### OpenStax Exercises

OpenStax Exercises is a Rails application. To run locally, you'll need Ruby 2.6.1+ and PostgreSQL:

```bash
cd OpenStax
docker-compose up
```

Or see the README.md in the OpenStax directory for detailed setup instructions.

---

## Statistics

| Resource | File Count | Size | License | Grade Levels |
|----------|-----------|------|---------|--------------|
| Khan Academy | 453 exercises | 21 MB | CC BY-NC-SA 3.0 | K-12+ |
| OpenStax | Database/API | 8.1 MB | AGPL-3.0 | College (9-12+) |

---

## Recommended Next Steps

1. **Download MAP Resources:** Visit map.mathshell.org to manually download specific formative assessment lessons and summative tasks by grade level and topic

2. **Access Illustrative Mathematics:** Create an account at AccessIM.org to download full curriculum materials

3. **Explore SBAC Items:** Browse sample items at sampleitems.smarterbalanced.org for standards-aligned assessment examples

4. **Contribute:** Both Khan Academy and OpenStax accept community contributions under their respective contribution agreements

---

## License Information

Each subdirectory contains its own LICENSE or COPYRIGHT file with detailed licensing terms. Please review these files before using or redistributing the materials.

**General Summary:**
- **Khan Academy:** Free for non-commercial educational use
- **OpenStax:** Open source with AGPL requirements (derivatives must be open source)
- **MAP:** Free for non-commercial use, no derivatives allowed
- **Illustrative Mathematics:** Free with attribution required
- **SBAC:** Review specific terms before use

---

## Date Downloaded

November 1, 2025

## Contact

For questions about specific resources, please contact the respective organizations through their official websites.
