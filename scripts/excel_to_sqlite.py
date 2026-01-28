"""
Disney Enterprise Entitlements - Excel to SQLite Converter
Converts the Excel spreadsheet to SQLite database for Metabase
"""

import pandas as pd
import sqlite3
from datetime import datetime
import sys
from pathlib import Path

# Configuration
EXCEL_FILE = r"C:\Users\MikeArbrouet\Desktop\Disney\Disney_Enterprise__Entitlements_by_Customer_Site_v3.xlsx"
OUTPUT_DB = Path(__file__).parent.parent / "data" / "entitlements.db"

def convert_excel_to_sqlite():
    """Convert Excel file to SQLite database"""
    
    print(f"Reading Excel file: {EXCEL_FILE}")
    
    try:
        # Read the Excel file
        df = pd.read_excel(EXCEL_FILE, engine='openpyxl')
        
        print(f"Successfully read {len(df)} rows")
        print(f"Columns found: {len(df.columns)}")
        
        # Clean column names for SQL compatibility
        df.columns = [col.replace(' ', '_').replace('&', 'and').replace('/', '_') for col in df.columns]
        
        # Ensure output directory exists
        OUTPUT_DB.parent.mkdir(parents=True, exist_ok=True)
        
        # Create SQLite database
        print(f"Creating SQLite database: {OUTPUT_DB}")
        conn = sqlite3.connect(OUTPUT_DB)
        
        # Write DataFrame to SQLite
        df.to_sql('entitlements', conn, if_exists='replace', index=False)
        
        # Create indexes for common query fields
        cursor = conn.cursor()
        
        print("Creating indexes for better query performance...")
        indexes = [
            "CREATE INDEX IF NOT EXISTS idx_brand ON entitlements(Brand)",
            "CREATE INDEX IF NOT EXISTS idx_customer ON entitlements(Customer_name)",
            "CREATE INDEX IF NOT EXISTS idx_region ON entitlements(CRM_region)",
            "CREATE INDEX IF NOT EXISTS idx_product ON entitlements(Current_product)",
            "CREATE INDEX IF NOT EXISTS idx_site ON entitlements(Site_number)"
        ]
        
        for idx_sql in indexes:
            try:
                cursor.execute(idx_sql)
            except Exception as e:
                print(f"Warning: Could not create index: {e}")
        
        # Create metadata table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS metadata (
                key TEXT PRIMARY KEY,
                value TEXT
            )
        """)
        
        metadata = [
            ('generated_at', datetime.now().isoformat()),
            ('source_file', EXCEL_FILE),
            ('total_records', str(len(df))),
            ('columns', ','.join(df.columns))
        ]
        
        cursor.executemany(
            "INSERT OR REPLACE INTO metadata (key, value) VALUES (?, ?)",
            metadata
        )
        
        conn.commit()
        conn.close()
        
        print(f"✓ Successfully converted {len(df)} records to SQLite")
        print(f"✓ Database file: {OUTPUT_DB}")
        
        # Print summary statistics
        print("\n=== Summary Statistics ===")
        print(f"Total Records: {len(df):,}")
        print(f"Total Columns: {len(df.columns)}")
        
        return True
        
    except FileNotFoundError:
        print(f"ERROR: Excel file not found at: {EXCEL_FILE}")
        print("Please verify the file path and try again.")
        return False
    except Exception as e:
        print(f"ERROR: Failed to convert Excel file: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("Disney Enterprise Entitlements - Excel to SQLite Converter")
    print("=" * 60)
    print()
    
    success = convert_excel_to_sqlite()
    
    if success:
        print("\n✓ Conversion completed successfully!")
        print("\nNext steps:")
        print("1. Use this database with Metabase")
        print("2. See metabase/docker-compose.yml for setup instructions")
        sys.exit(0)
    else:
        print("\n✗ Conversion failed. Please check the errors above.")
        sys.exit(1)

# Made with Bob
