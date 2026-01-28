"""
Disney Enterprise Entitlements - Excel to JSON Converter
Converts the Excel spreadsheet to JSON format for the HTML dashboard
"""

import pandas as pd
import json
from datetime import datetime, date
import sys
from pathlib import Path
import numpy as np

# Configuration
EXCEL_FILE = r"C:\Users\MikeArbrouet\Desktop\Disney\Disney_Enterprise__Entitlements_by_Customer_Site_v3.xlsx"
OUTPUT_FILE = Path(__file__).parent.parent / "data" / "entitlements.json"

class DateTimeEncoder(json.JSONEncoder):
    """Custom JSON encoder that handles datetime objects"""
    def default(self, obj):
        if isinstance(obj, (datetime, date, pd.Timestamp)):
            return obj.isoformat()
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if pd.isna(obj):
            return None
        return super().default(obj)

def convert_excel_to_json():
    """Convert Excel file to JSON format"""
    
    print(f"Reading Excel file: {EXCEL_FILE}")
    
    try:
        # Read the Excel file - headers are in row 1 (default header=0)
        df = pd.read_excel(EXCEL_FILE, engine='openpyxl', header=0)
        
        # Convert all column names to strings (in case any are datetime objects)
        df.columns = [str(col).strip() for col in df.columns]
        
        print(f"Successfully read {len(df)} rows")
        print(f"Columns found: {len(df.columns)}")
        print(f"Column names: {list(df.columns[:5])}...")  # Show first 5 columns
        
        # Convert ALL datetime columns to string format for JSON serialization
        print("Converting date/datetime columns...")
        for col in df.columns:
            # Check if column contains datetime objects
            if pd.api.types.is_datetime64_any_dtype(df[col]):
                print(f"  - Converting datetime column: {col}")
                df[col] = df[col].dt.strftime('%Y-%m-%d')
            # Also handle any remaining datetime objects that might be in object columns
            elif df[col].dtype == 'object':
                # Try to detect if this column has datetime objects
                sample = df[col].dropna().head(1)
                if len(sample) > 0 and isinstance(sample.iloc[0], (pd.Timestamp, datetime)):
                    print(f"  - Converting datetime column: {col}")
                    df[col] = pd.to_datetime(df[col], errors='coerce').dt.strftime('%Y-%m-%d')
        
        # Replace NaN values with None for proper JSON serialization
        df = df.replace({np.nan: None, np.inf: None, -np.inf: None})
        
        # Convert to list of dictionaries
        data = df.to_dict(orient='records')
        
        # Additional cleanup: ensure no NaN values in the data
        import math
        for record in data:
            for key, value in record.items():
                if value is not None and isinstance(value, float) and math.isnan(value):
                    record[key] = None
        
        # Create metadata
        metadata = {
            'generated_at': datetime.now().isoformat(),
            'total_records': len(data),
            'source_file': EXCEL_FILE,
            'columns': list(df.columns)
        }
        
        # Create final JSON structure
        output = {
            'metadata': metadata,
            'data': data
        }
        
        # Ensure output directory exists
        OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
        
        # Write to JSON file using custom encoder
        print(f"Writing JSON to: {OUTPUT_FILE}")
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(output, f, indent=2, ensure_ascii=False, cls=DateTimeEncoder)
        
        print(f"✓ Successfully converted {len(data)} records to JSON")
        print(f"✓ Output file: {OUTPUT_FILE}")
        
        # Print summary statistics
        print("\n=== Summary Statistics ===")
        if 'Brand' in df.columns:
            print(f"Unique Brands: {df['Brand'].nunique()}")
        if 'Customer name' in df.columns:
            print(f"Unique Customers: {df['Customer name'].nunique()}")
        if 'CRM region' in df.columns:
            print(f"Unique Regions: {df['CRM region'].nunique()}")
        
        # Calculate total quantities
        quantity_columns = [
            'Software license or appliance quantity',
            'Active S&S quantity',
            'Active Subscription License Quantity',
            'SaaS/Cloud software or leased appliance quantity'
        ]
        
        for col in quantity_columns:
            if col in df.columns:
                total = df[col].sum()
                if pd.notna(total):
                    print(f"Total {col}: {total:,.0f}")
        
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
    print("Disney Enterprise Entitlements - Excel to JSON Converter")
    print("=" * 60)
    print()
    
    success = convert_excel_to_json()
    
    if success:
        print("\n✓ Conversion completed successfully!")
        print("\nNext steps:")
        print("1. Open dashboard/index.html in your web browser")
        print("2. The dashboard will automatically load the data")
        sys.exit(0)
    else:
        print("\n✗ Conversion failed. Please check the errors above.")
        sys.exit(1)

# Made with Bob
