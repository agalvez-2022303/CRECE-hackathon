import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import { opportunities } from '../data/opportunities';
import { courses } from '../data/courses';
import { users } from '../data/users';

const connectionString = 'postgresql://postgres:"HijadeDios2020"@db.dsofdowrdgolzqyirnyj.supabase.co:5432/postgres';

async function seed() {
  const client = new Client({ connectionString });
  
  try {
    console.log('Connecting to database...');
    await client.connect();

    console.log('Executing schema...');
    const schemaPath = path.join(__dirname, '../../../../supabase-schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    await client.query(schemaSql);
    console.log('Schema created successfully.');

    console.log('Inserting courses...');
    for (const course of courses) {
      await client.query(`
        INSERT INTO courses (
          id, title, tagline, organization, org_type, org_verified, skill_taught,
          skill_label, duration, modality, link, tags, is_free, scholarship_coverage,
          spots_available, certificate_included, certificate_type, hero_image, badge_color,
          what_is_it, what_includes, level, modules_count
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
        ) ON CONFLICT (id) DO NOTHING;
      `, [
        course.id, course.title, course.tagline, course.organization, course.orgType, course.orgVerified, course.skillTaught,
        course.skillLabel, course.duration, course.modality, course.link, course.tags, course.isFree, course.scholarshipCoverage,
        course.spotsAvailable, course.certificateIncluded, course.certificateType, course.heroImage, course.badgeColor,
        course.whatIsIt, course.whatIncludes, course.level, course.modulesCount
      ]);
    }
    console.log(`Inserted ${courses.length} courses.`);

    console.log('Inserting opportunities...');
    for (const op of opportunities) {
      await client.query(`
        INSERT INTO opportunities (
          id, title, tagline, company, company_verified, company_type, location, type,
          salary, duration, vacancies, vacancies_text, modality, difficulty_level,
          hero_image, badge_color, category, category_label, what_is_it, what_includes,
          description, requirements, requirement_labels, hiring_process
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
        ) ON CONFLICT (id) DO NOTHING;
      `, [
        op.id, op.title, op.tagline, op.company, op.companyVerified, op.companyType, op.location, op.type,
        op.salary, op.duration, op.vacancies, op.vacanciesText, op.modality, 
        op.difficultyLevel, op.heroImage, op.badgeColor, op.category, op.categoryLabel, op.whatIsIt, op.whatIncludes,
        op.description, op.requirements, op.requirementLabels, op.hiringProcess
      ]);
    }
    console.log(`Inserted ${opportunities.length} opportunities.`);

    console.log('Inserting users...');
    for (const u of users) {
      await client.query(`
        INSERT INTO users (
          id, email, phone, phone_alt, name, last_name, avatar_url, is_safe_avatar,
          headline, summary, age, is_adult, birth_date, gender, marital_status,
          national_id, location, municipality, department, address, willing_to_relocate,
          has_vehicle, driving_license_type, education, availability, availability_detail,
          contract_preference, salary_expectation, portfolio_url, linkedin_url, github_url,
          custom_skills, skills, interests, is_demo, completed_courses_count, active_applications_count
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37
        ) ON CONFLICT (id) DO NOTHING;
      `, [
        u.id, u.email, u.phone, u.phoneAlt, u.name, u.lastName, u.avatar, u.isSafeAvatar,
        u.headline, u.summary, u.age, u.isAdult, u.birthDate ? new Date(u.birthDate) : null, u.gender, u.maritalStatus,
        u.nationalId, u.location, u.municipality, u.department, u.address, u.willingToRelocate,
        u.hasVehicle, u.drivingLicenseType, u.education, u.availability, u.availabilityDetail,
        u.contractPreference, u.salaryExpectation, u.portfolioUrl, u.linkedinUrl, u.githubUrl,
        u.customSkills, u.skills, u.interests, u.isDemo, u.completedCoursesCount, u.activeApplicationsCount
      ]);
    }
    console.log(`Inserted ${users.length} users.`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
  }
}

seed();
