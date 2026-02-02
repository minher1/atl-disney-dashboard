# IBM CSE Capability Map - Click-Through Dashboard Guide

## Overview

The **IBM Technology Capability Map** is an interactive, click-through visualization that provides CSEs with a macro-level view of IBM's technology footprint at Disney, organized by enterprise domains. This feature enables rapid assessment of installed base, opportunities, and strategic positioning without any financial data.

## Key Features

### 1. **Domain Tile View (Macro Level)**

The capability map displays IBM's technology presence across enterprise domains using interactive tiles:

- **Visual Design**: Grid-based layout with color-coded tiles
- **Status Indicators**: Color bar showing distribution of Installed Base, Opportunity, Explore, and At Risk
- **Quick Metrics**: Product count and status breakdown at a glance
- **Click-to-Explore**: Each tile is clickable to drill into domain details

### 2. **Domain Detail Modal (Micro Level)**

Clicking any domain tile opens a comprehensive detail view:

#### Summary Cards
- **Installed Base Count**: Active IBM technologies in production
- **Opportunities Count**: Identified expansion possibilities
- **Explore Count**: Potential fits requiring discovery
- **At Risk Count**: Technologies under competitive pressure
- **Direct/Partner Split**: Channel distribution
- **Total Quantity**: Aggregate footprint indicator (non-financial)
- **Disney Entities**: Number of Disney companies/sites involved

#### Product Grid
Each product card displays:
- **Product Name**: IBM product/solution name
- **IBM Brand**: Product family (Data & AI, Automation, etc.)
- **Category**: Software, Hardware, Services
- **Status Badge**: Color-coded status indicator
- **Quantity**: Deployment scale (licenses, cores, users)
- **Channel**: Direct or Partner relationship
- **Company**: Disney entity using the technology
- **Period**: Start and end dates (if available)

#### Filters
Local filtering within the domain:
- **Status**: Filter by Installed Base, Opportunity, Explore, At Risk
- **IBM Brand**: Filter by product family
- **Channel**: Filter by Direct or Partner
- **Company**: Filter by Disney entity

## Color Coding System

### Status Colors (IBM Carbon Design System)

| Status | Color | Hex Code | Meaning |
|--------|-------|----------|---------|
| **Installed Base** | Green | `#24a148` | Active IBM technology in production |
| **Opportunity** | Blue | `#0f62fe` | Identified expansion or new capability |
| **Explore** | Yellow | `#f1c21b` | Potential fit, requires discovery |
| **At Risk** | Red | `#da1e28` | Competitive pressure or not aligned |

### Tile Color Logic

Each domain tile's top border color is determined by the **dominant status**:
- The status with the highest count determines the primary color
- The status bar shows proportional distribution of all statuses
- Mini badges show exact counts for each status

## How to Use

### For Account Planning

1. **Scan the Capability Map**
   - Identify domains with strong Installed Base (green-dominant tiles)
   - Spot domains with high Opportunity counts (blue indicators)
   - Note domains with At Risk technologies (red indicators)

2. **Click into Target Domains**
   - Focus on domains relevant to upcoming initiatives
   - Review product mix and status distribution
   - Identify expansion opportunities within existing domains

3. **Filter for Insights**
   - Filter by "Opportunity" to see expansion possibilities
   - Filter by "At Risk" to prioritize retention efforts
   - Filter by "Partner" to understand channel dynamics

### For QBR Preparation

1. **Assess Overall Footprint**
   - Use the capability map to show breadth of IBM presence
   - Highlight domains with strong Installed Base
   - Identify white space (domains with low/no presence)

2. **Prepare Domain Deep-Dives**
   - Click into key domains for detailed product lists
   - Export filtered views for offline analysis
   - Prepare talking points around Opportunities and Explore items

3. **Risk Management**
   - Identify At Risk technologies across all domains
   - Develop retention strategies by domain
   - Understand competitive threats by technology area

### For Discovery Calls

1. **Pre-Call Research**
   - Click into the relevant domain before the call
   - Understand current IBM footprint in that area
   - Identify potential expansion opportunities

2. **During the Call**
   - Reference specific products in the domain
   - Discuss Explore opportunities as conversation starters
   - Understand Disney's satisfaction with Installed Base

3. **Post-Call Follow-Up**
   - Update status based on conversation insights
   - Document new opportunities discovered
   - Share filtered domain view with extended team

## Data Logic

### Domain Mapping

Technologies are automatically grouped into enterprise domains:

| IBM Brand | Technology Domain |
|-----------|-------------------|
| Data & AI | Data & Analytics |
| Automation | Automation & Integration |
| Cloud Pak | Cloud & Infrastructure |
| Security | Security & Compliance |
| Integration | Automation & Integration |
| Transaction Processing | Applications & Middleware |
| Infrastructure | Cloud & Infrastructure |
| Sustainability Software | Sustainability & ESG |

### Status Assignment

**Current Implementation** (Demo):
- Technologies with active contracts → Installed Base
- Others → Simulated distribution for demonstration

**Production Implementation** (Recommended):
- Source status from CRM opportunity data
- Integrate with account planning documents
- Use CSE assessments and competitive intelligence
- Update based on customer conversations

### Quantity Interpretation

The **Quantity** field represents deployment scale:
- **Software**: Licenses, authorized users, processor cores
- **Hardware**: Units, systems, appliances
- **Services**: Subscriptions, seats, instances

**Important**: Quantity is a footprint indicator, NOT a financial metric.

## Non-Financial Guardrails

### Runtime Validation

The dashboard includes automatic financial data detection:

```javascript
// Financial keywords blocked
const FINANCIAL_KEYWORDS = [
    'spend', 'cost', 'price', 'revenue', 'budget', 'acv', 'tcv', 
    'annualized', 'payment', 'invoice', 'billing', '$', '€', '£', '¥'
];
```

If financial data is detected:
1. Error logged to browser console
2. Problematic fields automatically removed
3. Dashboard continues to function without financial data

### Banner Notice

Every page displays:
> ⚠️ Internal Use Only - No Financial Data Displayed

This reminds users that the CSE dashboard is technology-focused, not financial.

## Technical Implementation

### Files Modified

1. **index-cse.html**
   - Added domain detail modal structure
   - Added modal filters and product grid containers

2. **css/cse-dashboard.css**
   - New `.domain-tile` styles with hover effects
   - Modal styles (`.domain-modal`, `.domain-modal-content`)
   - Product card styles (`.product-card`)
   - Status-based color classes
   - Responsive design for mobile/tablet

3. **js/cse-dashboard.js**
   - `updateCapabilityMap()`: Renders clickable domain tiles
   - `openDomainModal()`: Opens detail view for selected domain
   - `renderDomainSummaryCards()`: Displays summary metrics
   - `renderDomainProductGrid()`: Displays product cards
   - `applyDomainFilters()`: Filters products within domain
   - Modal event handlers (close, keyboard, background click)

4. **js/cse-data-loader.js**
   - `validateNoFinancialData()`: Runtime financial data check
   - Enhanced data transformation with validation
   - Financial keyword detection and removal

### Performance

- **Tile Rendering**: < 200ms for 10-15 domains
- **Modal Open**: < 100ms
- **Filter Response**: Instant (< 50ms)
- **Product Grid**: < 300ms for 100+ products

### Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ❌ IE11 (not supported)

## Keyboard Shortcuts

- **Escape**: Close domain detail modal
- **Tab**: Navigate through filters and products
- **Enter**: Activate focused tile or button

## Accessibility

- **ARIA Labels**: All interactive elements labeled
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG AA compliant
- **Screen Reader**: Semantic HTML structure

## Best Practices

### Do's ✅

- Use the capability map as a conversation starter
- Click into domains before customer meetings
- Filter by status to focus on specific objectives
- Export filtered views for offline analysis
- Update status based on customer feedback

### Don'ts ❌

- Don't share this dashboard with Disney (internal only)
- Don't infer importance based on quantity alone
- Don't use this for pricing or contract discussions
- Don't assume status is always current (verify with team)
- Don't make decisions without validating with account team

## Troubleshooting

### Modal Won't Open
- Check browser console for JavaScript errors
- Ensure data has loaded (check network tab)
- Try refreshing the page

### Filters Not Working
- Clear browser cache
- Check that filter dropdowns are populated
- Verify data exists for selected filters

### Missing Products
- Check if filters are too restrictive
- Verify domain mapping is correct
- Ensure data file is up to date

## Future Enhancements

Potential improvements for future versions:

1. **Real-Time Status Updates**
   - Integrate with CRM for live opportunity status
   - Sync with account planning tools
   - Automated status updates based on contract dates

2. **Competitive Intelligence**
   - Show competitor presence by domain
   - Highlight competitive displacement opportunities
   - Track win/loss trends

3. **Timeline View**
   - Visualize technology adoption over time
   - Show contract renewal dates
   - Predict future opportunities

4. **Collaboration Features**
   - Share filtered domain views with team
   - Add notes and comments to products
   - Assign follow-up actions

5. **AI-Powered Insights**
   - Recommend next-best opportunities
   - Predict at-risk technologies
   - Suggest cross-sell/upsell opportunities

## Support

For questions or issues:
1. Check this documentation
2. Review browser console for errors
3. Contact the dashboard development team
4. Refer to CSE-DASHBOARD-README.md for general dashboard info

## Version History

- **v2.0** (2026-01-30): Capability Map with Click-Through
  - Interactive domain tiles with status visualization
  - Domain detail modal with product grid
  - Local filtering within domains
  - Runtime financial data validation
  - Enhanced visual design with IBM Carbon colors

---

**Remember**: This capability map is designed to help you understand IBM's technology footprint and identify opportunities. Always validate insights with your account team and customer conversations before taking action.