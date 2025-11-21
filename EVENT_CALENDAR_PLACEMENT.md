# Event Calendar & Schedule - Placement Strategy

## Recommended Placement Options

### Option 1: **Dedicated Calendar Page** (Recommended)
**Location**: `/calendar` or `/events`

**Pros:**
- Full-featured calendar with month/week views
- Room for all features (iCal export, filters, etc.)
- Doesn't clutter homepage
- Easy to find in navigation
- Can be bookmarked

**Implementation:**
- Add "Calendar" or "Events" to navbar menu
- Create new page: `src/pages/Calendar.js` or `src/pages/Events.js`
- Add route in `App.js`
- Add to admin panel for event management

**Navbar Position:**
- After "Weekly Updates" or before "Community"
- Could be in top 6 desktop items for visibility

---

### Option 2: **Homepage Widget + Dedicated Page**
**Location**: 
- Small calendar widget on homepage
- Full page at `/calendar`

**Pros:**
- Quick preview on homepage
- Full features on dedicated page
- Best of both worlds
- Drives traffic to full calendar

**Homepage Widget Placement:**
- After "Weekly Khutbah Card" section
- Before "Weekly Updates Preview"
- Or in a sidebar (if layout allows)

**Widget Features:**
- Next 3-5 upcoming events
- "View Full Calendar" button
- Countdown to next Jumu'ah
- Quick date navigation

---

### Option 3: **Integrated with Existing Pages**
**Location**: Multiple touchpoints

**Options:**
1. **Khateebs page** - Show calendar of khateeb dates
2. **Community page** - Add "Upcoming Events" section
3. **Homepage** - Mini calendar in hero or sidebar
4. **Dedicated page** - Full calendar experience

**Pros:**
- Contextual placement
- No new navigation item needed
- Integrates with existing content

---

## My Recommendation: **Option 1 + Option 2 Hybrid**

### Primary: Dedicated `/calendar` Page
- Full monthly/weekly calendar view
- All Jumu'ah dates
- Special events (Ramadan, Eid, etc.)
- iCal/Google Calendar export
- Event filters and search
- Event details modal

### Secondary: Homepage Mini Widget
- Next 3-5 upcoming events
- Countdown to next Jumu'ah
- "View Full Calendar" CTA
- Small, non-intrusive

### Navbar Placement
Add "Calendar" or "Events" to navbar:
- Position: After "Weekly Updates" (3rd or 4th item)
- Label: "Calendar" or "Events" or "Schedule"
- Icon: Calendar icon

---

## Implementation Plan

### 1. **Navbar Update**
```javascript
// Add to navItems array
{ path: '/calendar', label: 'Calendar' }
// Or
{ path: '/events', label: 'Events' }
```

### 2. **New Page Structure**
```
src/pages/Calendar.js
- Monthly view (default)
- Weekly view toggle
- Event list view
- Filters (Jumu'ah, Special Events, etc.)
- iCal export button
- Google Calendar add button
```

### 3. **Data Structure**
```json
// src/data/events.json
{
  "events": [
    {
      "id": 1,
      "title": "Jumu'ah Prayer",
      "date": "2025-01-24",
      "time": "1:20 PM",
      "type": "jumuah",
      "khateebId": 1,
      "location": "Cook Student Center MPR",
      "description": "Weekly Jumu'ah prayer",
      "isRecurring": true,
      "recurrence": "weekly"
    },
    {
      "id": 2,
      "title": "Ramadan Iftar",
      "date": "2025-03-15",
      "time": "7:00 PM",
      "type": "special",
      "location": "Cook Student Center",
      "description": "Community iftar during Ramadan"
    }
  ]
}
```

### 4. **Homepage Widget**
```javascript
// Add to Homepage.js
<section className="py-12 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <UpcomingEventsWidget />
  </div>
</section>
```

### 5. **Admin Panel**
```
src/pages/admin/AdminEvents.js
- Add/edit/delete events
- Set recurring events
- Import from khateebs
- Bulk operations
```

---

## Visual Layout Suggestions

### Calendar Page Layout:
```
┌─────────────────────────────────────┐
│  Calendar / Events                  │
│  [Month] [Week] [List] [Filters]   │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │  January 2025                 │  │
│  │  [< Prev]        [Next >]     │  │
│  ├──────────────────────────────┤  │
│  │  Sun Mon Tue Wed Thu Fri Sat │  │
│  │  ─── ─── ───  1   2   3   4  │  │
│  │   5   6   7   8   9  10  11  │  │
│  │  12  13  14  15  16  17  18  │  │
│  │  19  20  21  22  23 [24] 25  │  │ ← Jumu'ah
│  │  26  27  28  29  30  31      │  │
│  └──────────────────────────────┘  │
│                                     │
│  Upcoming Events:                   │
│  • Jan 24 - Jumu'ah (Br. Ahmed)     │
│  • Jan 31 - Jumu'ah (Br. Hassan)    │
│  • Feb 7 - Special Event            │
│                                     │
│  [Export to Google Calendar]        │
│  [Download iCal]                    │
└─────────────────────────────────────┘
```

### Homepage Widget:
```
┌──────────────────────────────┐
│  📅 Upcoming Events           │
│  ──────────────────────────── │
│  Next Jumu'ah: 3 days         │
│                              │
│  Jan 24 - Jumu'ah            │
│  Jan 31 - Jumu'ah            │
│  Feb 7 - Special Event       │
│                              │
│  [View Full Calendar →]      │
└──────────────────────────────┘
```

---

## Features to Include

### Phase 1 (MVP):
- ✅ Monthly calendar view
- ✅ Jumu'ah dates from khateebs
- ✅ Special events
- ✅ Event details modal
- ✅ "View Full Calendar" on homepage
- ✅ Navbar link

### Phase 2 (Enhanced):
- ✅ Weekly view toggle
- ✅ List view
- ✅ Filters (type, date range)
- ✅ iCal export
- ✅ Google Calendar integration
- ✅ Countdown to next event
- ✅ Admin panel for events

### Phase 3 (Advanced):
- ✅ Event reminders
- ✅ RSVP functionality
- ✅ Recurring events
- ✅ Event categories/tags
- ✅ Search functionality
- ✅ Print-friendly view

---

## Which approach would you prefer?

1. **Just dedicated page** (`/calendar`) - Clean, focused
2. **Homepage widget + page** - More visibility
3. **Integrated with existing pages** - Contextual
4. **Something else** - Let me know your preference!

I can implement whichever approach you prefer!

