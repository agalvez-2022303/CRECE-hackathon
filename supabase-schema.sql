-- CRECE Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE company_type AS ENUM ('Empresa Privada', 'Corporativo', 'Organización Social', 'Alianza Público-Privada');
CREATE TYPE modality_type AS ENUM ('Presencial', 'Híbrido', '100% Remoto');
CREATE TYPE difficulty_level AS ENUM ('Sin experiencia requerida', 'Nivel Inicial', 'Intermedio', 'Nivel Inicial con Inglés');
CREATE TYPE org_type AS ENUM ('Certificación Internacional', 'Fundación Global', 'Instituto Técnico Nacional', 'Plataforma Educativa');
CREATE TYPE course_modality AS ENUM ('100% Online Asincrónico', 'Online con Sesiones en Vivo', 'Híbrido con Talleres Prácticos');
CREATE TYPE course_level AS ENUM ('Desde Cero (Principiantes)', 'Intermedio', 'Todos los Niveles');
CREATE TYPE certificate_type AS ENUM ('Certificado Oficial Verificable', 'Insignia Digital LinkedIn', 'Título Técnico Avalado');
CREATE TYPE badge_category AS ENUM ('match', 'learning', 'community', 'special');
CREATE TYPE language_level AS ENUM ('Nativo', 'Avanzado', 'Intermedio', 'Básico');
CREATE TYPE employment_type AS ENUM ('Tiempo Completo', 'Medio Tiempo', 'Pasantía Remunerada', 'Por Proyecto');
CREATE TYPE contract_type AS ENUM ('Contrato indefinido', 'Contrato fijo', 'Convenio', 'Por proyecto');
CREATE TYPE application_status AS ENUM ('pendiente', 'revisada', 'entrevista', 'aceptada', 'rechazada');
CREATE TYPE enrollment_status AS ENUM ('inscrito', 'en_progreso', 'completado', 'abandonado');

-- ============================================================
-- USERS TABLE
-- ============================================================
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    phone_alt VARCHAR(50),
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    avatar_url TEXT,
    is_safe_avatar BOOLEAN DEFAULT false,
    headline VARCHAR(255),
    summary TEXT,
    age INTEGER,
    is_adult BOOLEAN DEFAULT false,
    birth_date DATE,
    gender VARCHAR(50),
    marital_status VARCHAR(50),
    national_id VARCHAR(50),
    location VARCHAR(255),
    municipality VARCHAR(100),
    department VARCHAR(100),
    address TEXT,
    willing_to_relocate BOOLEAN DEFAULT false,
    has_vehicle BOOLEAN DEFAULT false,
    driving_license_type VARCHAR(50),
    education VARCHAR(100),
    availability VARCHAR(100),
    availability_detail TEXT,
    contract_preference VARCHAR(100),
    salary_expectation VARCHAR(100),
    portfolio_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    custom_skills TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    interests TEXT[] DEFAULT '{}',
    is_demo BOOLEAN DEFAULT false,
    completed_courses_count INTEGER DEFAULT 0,
    active_applications_count INTEGER DEFAULT 0,
    emergency_contact JSONB,
    role user_role DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- USER EXPERIENCES
-- ============================================================
CREATE TABLE user_experiences (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    employment_type employment_type,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- USER EDUCATION HISTORY
-- ============================================================
CREATE TABLE user_education (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- USER LANGUAGES
-- ============================================================
CREATE TABLE user_languages (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    level language_level NOT NULL DEFAULT 'Nativo',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- USER BADGES
-- ============================================================
CREATE TABLE user_badges (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    unlocked_date DATE NOT NULL DEFAULT CURRENT_DATE,
    category badge_category NOT NULL,
    accent_color VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- USER CERTIFICATES
-- ============================================================
CREATE TABLE user_certificates (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    course_title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    org_logo VARCHAR(255),
    issue_date DATE NOT NULL,
    validation_code VARCHAR(100) UNIQUE,
    hours_completed INTEGER DEFAULT 0,
    skills_gained TEXT[] DEFAULT '{}',
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- OPPORTUNITIES (JOB POSTINGS)
-- ============================================================
CREATE TABLE opportunities (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tagline VARCHAR(500),
    company VARCHAR(255) NOT NULL,
    company_verified BOOLEAN DEFAULT false,
    company_type company_type NOT NULL DEFAULT 'Empresa Privada',
    location VARCHAR(255) NOT NULL,
    type employment_type NOT NULL DEFAULT 'Tiempo Completo',
    salary VARCHAR(255),
    duration VARCHAR(255),
    vacancies INTEGER DEFAULT 1,
    vacancies_text VARCHAR(255),
    modality modality_type NOT NULL DEFAULT 'Presencial',
    deadline DATE,
    difficulty_level difficulty_level NOT NULL DEFAULT 'Sin experiencia requerida',
    hero_image TEXT,
    badge_color VARCHAR(50),
    category VARCHAR(100) NOT NULL,
    category_label VARCHAR(255),
    what_is_it TEXT,
    what_includes TEXT[] DEFAULT '{}',
    description TEXT,
    requirements TEXT[] DEFAULT '{}',
    requirement_labels TEXT[] DEFAULT '{}',
    hiring_process TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COURSES
-- ============================================================
CREATE TABLE courses (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tagline VARCHAR(500),
    organization VARCHAR(255) NOT NULL,
    org_type org_type NOT NULL,
    org_verified BOOLEAN DEFAULT false,
    skill_taught VARCHAR(100) NOT NULL,
    skill_label VARCHAR(255),
    duration VARCHAR(255),
    modality course_modality NOT NULL DEFAULT '100% Online Asincrónico',
    link TEXT,
    tags TEXT[] DEFAULT '{}',
    is_free BOOLEAN DEFAULT true,
    scholarship_coverage VARCHAR(255),
    spots_available VARCHAR(255),
    certificate_included BOOLEAN DEFAULT true,
    certificate_type certificate_type NOT NULL DEFAULT 'Certificado Oficial Verificable',
    hero_image TEXT,
    badge_color VARCHAR(50),
    what_is_it TEXT,
    what_includes TEXT[] DEFAULT '{}',
    level course_level NOT NULL DEFAULT 'Desde Cero (Principiantes)',
    modules_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- USER APPLICATIONS TO OPPORTUNITIES
-- ============================================================
CREATE TABLE user_applications (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    opportunity_id VARCHAR(255) REFERENCES opportunities(id) ON DELETE CASCADE,
    status application_status DEFAULT 'pendiente',
    match_percentage INTEGER,
    matched_requirements TEXT[] DEFAULT '{}',
    missing_requirements TEXT[] DEFAULT '{}',
    application_code VARCHAR(50) UNIQUE,
    interview_date_suggestion TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, opportunity_id)
);

-- ============================================================
-- USER COURSE ENROLLMENTS
-- ============================================================
CREATE TABLE user_enrollments (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR(255) REFERENCES courses(id) ON DELETE CASCADE,
    status enrollment_status DEFAULT 'inscrito',
    progress_percentage INTEGER DEFAULT 0,
    completed_modules INTEGER DEFAULT 0,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    certificate_issued BOOLEAN DEFAULT false,
    certificate_id VARCHAR(255) REFERENCES user_certificates(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- ============================================================
-- INDEXES
-- ============================================================
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_is_demo ON users(is_demo);
CREATE INDEX idx_users_is_adult ON users(is_adult);
CREATE INDEX idx_users_location ON users(location);
CREATE INDEX idx_users_skills ON users USING GIN(skills);
CREATE INDEX idx_users_interests ON users USING GIN(interests);

-- User related
CREATE INDEX idx_user_experiences_user_id ON user_experiences(user_id);
CREATE INDEX idx_user_education_user_id ON user_education(user_id);
CREATE INDEX idx_user_languages_user_id ON user_languages(user_id);
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_certificates_user_id ON user_certificates(user_id);
CREATE INDEX idx_user_certificates_validation_code ON user_certificates(validation_code);

-- Opportunities
CREATE INDEX idx_opportunities_category ON opportunities(category);
CREATE INDEX idx_opportunities_location ON opportunities(location);
CREATE INDEX idx_opportunities_modality ON opportunities(modality);
CREATE INDEX idx_opportunities_difficulty ON opportunities(difficulty_level);
CREATE INDEX idx_opportunities_is_active ON opportunities(is_active);
CREATE INDEX idx_opportunities_requirements ON opportunities USING GIN(requirements);
CREATE INDEX idx_opportunities_company ON opportunities(company);

-- Courses
CREATE INDEX idx_courses_skill_taught ON courses(skill_taught);
CREATE INDEX idx_courses_tags ON courses USING GIN(tags);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_is_free ON courses(is_free);
CREATE INDEX idx_courses_is_active ON courses(is_active);
CREATE INDEX idx_courses_organization ON courses(organization);

-- Applications
CREATE INDEX idx_user_applications_user_id ON user_applications(user_id);
CREATE INDEX idx_user_applications_opportunity_id ON user_applications(opportunity_id);
CREATE INDEX idx_user_applications_status ON user_applications(status);

-- Enrollments
CREATE INDEX idx_user_enrollments_user_id ON user_enrollments(user_id);
CREATE INDEX idx_user_enrollments_course_id ON user_enrollments(course_id);
CREATE INDEX idx_user_enrollments_status ON user_enrollments(status);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_enrollments ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    ));

-- Demo users are publicly readable
CREATE POLICY "Demo users are publicly readable" ON users
    FOR SELECT USING (is_demo = true);

-- User experiences policies
CREATE POLICY "Users can manage own experiences" ON user_experiences
    FOR ALL USING (user_id = auth.uid());

-- User education policies
CREATE POLICY "Users can manage own education" ON user_education
    FOR ALL USING (user_id = auth.uid());

-- User languages policies
CREATE POLICY "Users can manage own languages" ON user_languages
    FOR ALL USING (user_id = auth.uid());

-- User badges policies
CREATE POLICY "Users can view own badges" ON user_badges
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own badges" ON user_badges
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- User certificates policies
CREATE POLICY "Users can view own certificates" ON user_certificates
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own certificates" ON user_certificates
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Opportunities policies (public read, admin write)
CREATE POLICY "Public read active opportunities" ON opportunities
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage opportunities" ON opportunities
    FOR ALL USING (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    ));

-- Courses policies (public read, admin write)
CREATE POLICY "Public read active courses" ON courses
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage courses" ON courses
    FOR ALL USING (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    ));

-- Applications policies
CREATE POLICY "Users can view own applications" ON user_applications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create applications" ON user_applications
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own applications" ON user_applications
    FOR UPDATE USING (user_id = auth.uid());

-- Enrollments policies
CREATE POLICY "Users can view own enrollments" ON user_enrollments
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own enrollments" ON user_enrollments
    FOR ALL USING (user_id = auth.uid());

-- ============================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_experiences_updated_at BEFORE UPDATE ON user_experiences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_education_updated_at BEFORE UPDATE ON user_education
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON opportunities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_applications_updated_at BEFORE UPDATE ON user_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_enrollments_updated_at BEFORE UPDATE ON user_enrollments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================
-- Function to calculate match percentage for a user and opportunity
CREATE OR REPLACE FUNCTION calculate_match_percentage(user_skills TEXT[], opportunity_requirements TEXT[])
RETURNS INTEGER AS $$
DECLARE
    total_reqs INTEGER;
    matched_count INTEGER := 0;
    req TEXT;
BEGIN
    total_reqs := array_length(opportunity_requirements, 1);
    IF total_reqs IS NULL OR total_reqs = 0 THEN
        RETURN 100;
    END IF;

    FOREACH req IN ARRAY opportunity_requirements LOOP
        IF req = ANY(user_skills) THEN
            matched_count := matched_count + 1;
        END IF;
    END LOOP;

    RETURN ROUND((matched_count::NUMERIC / total_reqs) * 100);
END;
$$ LANGUAGE plpgsql;

-- Function to get recommended courses for missing skills
CREATE OR REPLACE FUNCTION get_recommended_courses(missing_skills TEXT[], limit_count INTEGER DEFAULT 2)
RETURNS SETOF courses AS $$
BEGIN
    RETURN QUERY
    SELECT c.*
    FROM courses c
    WHERE c.skill_taught = ANY(missing_skills)
    AND c.is_active = true
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- SEED DATA (Optional - uncomment to run)
-- ============================================================
-- INSERT INTO users (id, email, phone, name, last_name, ...)
-- VALUES ('demo-adult', 'maria.lopez@crece.gt', '5555-0001', 'María', 'López Alvarado', ...);
