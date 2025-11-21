# Admin Panel Testing Guide

## Access the Admin Panel

1. Navigate to `/admin/login` or click "Admin" link in footer
2. Default password: `jummah2025`
3. After login, you'll be redirected to `/admin` dashboard

## Admin Features

### 1. Manage Khateebs (`/admin/khateebs`)
- ✅ Add new khateebs with name, date, title, bio, image
- ✅ Edit existing khateebs
- ✅ Delete khateebs
- ✅ Mark khateebs as upcoming
- ✅ Drag and drop to reorder khateebs
- Changes are immediately visible on the website

### 2. Manage Weekly Content (`/admin/weekly-content`)
- ✅ Add/edit Qur'an ayat and Du'as
- ✅ Arabic text, transliteration, translation, reference
- ✅ Delete content
- Changes appear on Weekly Updates page

### 3. Manage Gems (`/admin/gems`)
- ✅ Add/edit weekly gems
- ✅ Title, content, date, author
- ✅ Delete gems
- Changes appear on Gems page

### 4. Manage Salawaat Series (`/admin/salawaat`)
- ✅ Add/edit salawaat installments
- ✅ Arabic, transliteration, translation, explanation
- ✅ Delete salawaat
- Changes appear on Salawaat page

### 5. Manage Al-Kahf Circle (`/admin/kahf-circle`)
- ✅ Add/edit Instagram clips
- ✅ Title, description, Instagram URL, thumbnail
- ✅ Delete clips
- Changes appear on Al-Kahf Circle page

### 6. Configure Livestream (`/admin/livestream`)
- ✅ Toggle livestream on/off
- ✅ Set platform (Instagram, YouTube, Facebook, Custom)
- ✅ Add livestream URL
- ✅ Custom embed URL for custom platforms
- Changes appear on homepage and khateeb pages

### 7. Manage Team (`/admin/team`)
- ✅ Edit team mission statement
- ✅ Edit subteam descriptions
- ✅ Add/edit/remove team members
- ✅ Update member names, roles, quotes, images
- Changes appear on Team page

### 8. Manage Sunnah Reminders (`/admin/sunnah-reminders`)
- ✅ Add/edit Friday Sunnah reminders
- ✅ Title, description, Arabic text, reference
- ✅ Delete reminders
- Changes appear on Sunnah Reminders page

### 9. Admin Settings (`/admin/settings`)
- ✅ Change admin password
- ✅ Must be at least 6 characters
- ✅ Session lasts 24 hours
- ✅ Logout after password change

## Data Persistence

- All changes are saved to browser localStorage
- Changes persist across page refreshes
- Data is initialized from JSON files on first load
- Multiple browser tabs will sync via event system

## Testing Checklist

1. ✅ Login with password `jummah2025`
2. ✅ Add a new khateeb and verify it appears on website
3. ✅ Edit a khateeb and verify changes
4. ✅ Delete a khateeb and verify removal
5. ✅ Reorder khateebs by dragging
6. ✅ Add weekly content and verify on Updates page
7. ✅ Add a gem and verify on Gems page
8. ✅ Configure livestream and verify on homepage
9. ✅ Change admin password
10. ✅ Logout and verify cannot access admin without login
11. ✅ Verify changes persist after page refresh
12. ✅ Verify changes appear immediately on public pages

## Security Notes

- Password is stored in localStorage (client-side only)
- Session expires after 24 hours
- Admin routes are protected by AdminRoute component
- Default password should be changed in production
- Consider adding backend authentication for production use

## URL Structure

- `/admin/login` - Login page
- `/admin` - Dashboard
- `/admin/khateebs` - Manage khateebs
- `/admin/weekly-content` - Manage weekly content
- `/admin/gems` - Manage gems
- `/admin/salawaat` - Manage salawaat
- `/admin/kahf-circle` - Manage Al-Kahf Circle
- `/admin/livestream` - Configure livestream
- `/admin/team` - Manage team
- `/admin/sunnah-reminders` - Manage Sunnah reminders
- `/admin/settings` - Admin settings

