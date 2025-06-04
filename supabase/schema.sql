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

-- Enable Row Level Security
ALTER TABLE user_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for everyone
CREATE POLICY "Allow public inserts" ON user_inquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to allow reads for authenticated users only
CREATE POLICY "Allow authenticated reads" ON user_inquiries
  FOR SELECT TO authenticated
  USING (true);
