-- Create user_inquiries table
CREATE TABLE IF NOT EXISTS user_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  material TEXT NOT NULL,
  size_range TEXT NOT NULL,
  pressure_rating TEXT NOT NULL,
  temperature_range TEXT NOT NULL,
  image_url TEXT,
  applications TEXT[], -- Array of applications
  additional_specs TEXT[], -- Array of additional specifications
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name) VALUES 
  ('Pipe Clamps'),
  ('Flanges'),
  ('Couplings'),
  ('Valves'),
  ('Adapters'),
  ('Fittings')
ON CONFLICT (name) DO NOTHING;

-- Insert default products
INSERT INTO products (name, description, category, material, size_range, pressure_rating, temperature_range, applications, additional_specs) VALUES 
  (
    'Heavy Duty PVC Pipe Clamp',
    'Robust pipe clamp designed for high-pressure applications with superior grip and durability.',
    'Pipe Clamps',
    'PVC with Steel Reinforcement',
    '1/2" - 8"',
    '300 PSI',
    '-10°C to 80°C',
    ARRAY['Water supply systems', 'Industrial piping', 'Chemical processing', 'HVAC systems'],
    ARRAY['NSF certified', 'UV resistant', 'Corrosion resistant', 'Easy installation']
  ),
  (
    'Standard PVC Flange',
    'High-quality PVC flange for secure pipe connections in various industrial applications.',
    'Flanges',
    'PVC',
    '2" - 12"',
    '150 PSI',
    '0°C to 60°C',
    ARRAY['Water treatment plants', 'Chemical processing', 'Food and beverage industry', 'Pharmaceutical applications'],
    ARRAY['ANSI standard', 'Smooth finish', 'Chemical resistant', 'Long service life']
  ),
  (
    'Quick Connect Coupling',
    'Fast and reliable coupling system for temporary or permanent pipe connections.',
    'Couplings',
    'PVC with Rubber Seals',
    '1" - 6"',
    '200 PSI',
    '-5°C to 70°C',
    ARRAY['Irrigation systems', 'Pool and spa installations', 'Temporary piping', 'Maintenance applications'],
    ARRAY['Tool-free installation', 'Leak-proof design', 'Reusable', 'Color-coded sizes']
  )
ON CONFLICT DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts on user_inquiries" ON user_inquiries;
DROP POLICY IF EXISTS "Allow authenticated reads on user_inquiries" ON user_inquiries;
DROP POLICY IF EXISTS "Allow public reads on products" ON products;
DROP POLICY IF EXISTS "Allow authenticated all on products" ON products;
DROP POLICY IF EXISTS "Allow public reads on categories" ON categories;
DROP POLICY IF EXISTS "Allow authenticated all on categories" ON categories;

-- Disable RLS temporarily to allow all operations
ALTER TABLE user_inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for products table
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
