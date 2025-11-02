# Complete Screen-by-Screen Flow

## From Zero to Mastery: All 30 Screens

This document provides detailed specifications for every screen in the Engage user journey, from first launch to quarterly review.

---

## Phase 1: First Launch & Onboarding

### SCREEN 0: App Launch (Cold Start)

**Context:** User opens Engage for the very first time

**Visual Design:**
```
Background: Gradient (#D8F1E9 → #EFF6EE → #FFFFFF)
Logo: Engage geometric circle (80pt × 80pt), centered
Text: "Engage" below logo (24pt, Medium weight)
Animation: Logo fades in (0.3s), Text fades in (0.5s), holds 1.5s, fades out
Total Duration: 2.1 seconds
```

**Purpose:** Brand introduction, loading moment

**Technical:** Splash screen while app initializes

---

### SCREEN 1: Authentication Gate

**Context:** User needs to sign in or sign up

**Layout:**
```
[Small Engage logo at top]

"Welcome to Engage"
"Your work companion for productivity and wellbeing"

[Primary Button: 📧 Continue with Work Email]
[Primary Button: 🔐 Continue with SSO]

─── OR ───

[Secondary Button: Continue with Google]
[Secondary Button: Continue with Microsoft]

"Already have an account?"
[Text Link: Sign In]
```

**Interaction:**
- Tap any button → Navigate to respective auth flow
- Most common path: Work Email (enterprise focus)
- SSO: Single Sign-On for companies with existing auth

**Technical:**
- Email: Custom auth flow
- SSO: SAML/OAuth integration
- Google/Microsoft: OAuth 2.0

---

### SCREEN 2A: Email Authentication

**Context:** User chose "Continue with Work Email"

**Layout:**
```
[< Back button]

"Get started with Engage"

Your work email:
[Text Input: sarah.chen@acme.com]

Your company:
[Dropdown: Auto-detected from email domain]
💡 "Your company already uses Engage"

[Primary Button: Continue →]

"By continuing, you agree to our [Terms] and [Privacy Policy]"
```

**Smart Features:**
- Email domain → Auto-detect company
- If company exists: "Join your team"
- If new company: Different admin flow

**Validation:**
- Must be valid email format
- Must be work email (no Gmail/Yahoo for company accounts)
- Button disabled until valid

---

### SCREEN 2B: Email Verification

**Context:** Verification email sent

**Layout:**
```
[< Back]

[Email Icon]

"Check your email"

"We sent a verification link to:
sarah.chen@acme.com"

"Click the link in the email to continue.
It expires in 15 minutes."

────

Didn't receive it?
[Text Button: Resend email]
[Text Button: Use a different email]

────

💡 Check your spam folder if you don't see it.
```

**Auto-Detection:**
- App polls server every 3 seconds
- When email verified → Auto-advance (no manual refresh needed)

**Resend Logic:**
- Disabled for 60 seconds after send
- Shows countdown: "Resend in 45s..."

---

### SCREEN 3: Profile Setup

**Context:** Email verified, creating profile

**Layout:**
```
[< Back]    Step 1 of 4

"Let's set up your profile"

[Tap to add photo]
[Profile Photo Placeholder: Circle, 80pt]

Your name:
[Text Input: Sarah Chen]

Your role:
[Text Input: Product Designer]

Your team:
[Dropdown: Product Team]

Your manager (optional):
[Search Input: 🔍 Search for manager...]

[Primary Button: Continue →]
```

**Smart Features:**
- Name pre-filled from email (Sarah Chen from sarah.chen@)
- Photo: Tap → Camera or Library
- Team: Pre-populated from company org chart
- Manager: Search existing employees

---

### SCREEN 4: First Goal Creation

**Context:** Core onboarding - creating first goal

**Layout:**
```
[< Back]    Step 2 of 4

"Let's start with what matters most to you at work"

What's one thing you want to achieve in the next 30 days?

[Text Area:
"Launch the new customer dashboard"

Examples:
• Ship the redesign
• Improve my presentations
• Complete the Q4 plan
• Learn data analytics
]

💡 Don't worry, you can change this anytime.

[Primary Button: Continue →]

[Text Button: Skip for now]
```

**Philosophy:**
- Natural language (no templates)
- Examples inspire but don't constrain
- 200 character limit
- AI will structure later

---

### SCREEN 5: Initial Mood Check

**Context:** Establishing emotional baseline

**Layout:**
```
[< Back]    Step 3 of 4

"One more thing..."

How are you feeling about work right now?

😊      😌      😐      😓      😰
Ready  Good  Okay  Tired Stressed

This helps Engage support you.
It's private—only you and the AI see this.

Want to add context? (optional)
[Text Input: Tap to add a note...]

[Primary Button: Continue →]

[Text Button: Skip for now]
```

**Interaction:**
- Tap emotion → Highlights (others dim)
- Optional note expands on tap
- Privacy message builds trust

---

### SCREEN 6: Tour Option

**Context:** Onboarding complete, offer guided tour

**Layout:**
```
Step 4 of 4

"You're all set!"

[Checkmark Icon]

"Want a quick tour, or would you rather explore on your own?"

[Primary Button: Show me around (2 min) →]

[Secondary Button: I'll explore on my own →]

────

💡 You can always access the tour later in Settings.
```

**Two Paths:**
1. **Show me around** → 5-screen tooltip tour
2. **I'll explore** → Straight to FlowBoard

---

### SCREEN 7A: Guided Tour (If Selected)

**Context:** 5-screen tooltip overlay on actual FlowBoard

**Tooltip 1: FlowBoard**
```
[Tooltip pointing to main content area]

💡 This is your FlowBoard

Your daily command center.
It shows what matters today and keeps you focused.

[Button: Next (1 of 5)]
```

**Tooltip 2: Navigation**
```
[Tooltip pointing to bottom nav]

Navigate with these four tabs:
Goals, Team, Grow, and You.
Tap any tab to explore.

[Button: Next (2 of 5)]
```

**Tooltip 3: Recognition**
```
[Tooltip pointing to + Give button]

See great work? Tap here to
recognize a teammate. It takes 10 seconds.

[Button: Next (3 of 5)]
```

**Tooltip 4: Mood Check**
```
[Tooltip pointing to emoji in header]

This shows how you're feeling.
Tap it anytime to check in with yourself.

[Button: Next (4 of 5)]
```

**Tooltip 5: Profile**
```
[Tooltip pointing to profile photo]

Your personal dashboard is here.
View insights, settings, and your growth over time.

[Button: Done (5 of 5)]
```

**After Tour:**
- Success message: "You're ready to go! 🎉"
- Full FlowBoard revealed

---

## Phase 2: First Day Experience

### SCREEN 8: FlowBoard (Day 1, Post-Onboarding)

**Context:** User's first real interaction with main interface

**Layout:**
```
😊 Sarah       [🔍 Search] [Profile Photo]
Product Designer @ Acme Co

────

YOUR FOCUS TODAY

[Large Priority Card:
🎯 PRIORITY #1

Launch customer dashboard

📅 Target: 30 days
🔥 High Impact

Next step:
"Define requirements"

[Secondary Button: View Goal] [Primary Button: Start This]
]

────

GETTING STARTED

[Small Card: 👋 Welcome!
Give recognition to a teammate
Suggested]

[Small Card: 📚 Explore
Learning Paths
Optional]

[+ Add task]    [See all >]

────
Bottom Nav: [📊 Goals] [💬 Team] [🎓 Grow] [👤 You]
                (Active)
```

**Smart Features:**
- AI already broke down goal into first step: "Define requirements"
- Gentle onboarding suggestions (recognizeexplore)
- Clean, focused interface

---

### SCREEN 9: Goal Detail View (First Time)

**Context:** User taps Priority #1 card

**Layout:**
```
[< Back]    CUSTOMER DASHBOARD    [⋮ Menu]

────

Launch customer dashboard

📊 Progress Timeline

◉────○────○────○────○
Define Build Test Launch Review
Now    +1wk  +2wk  +3wk   +1mo

Overall: 5% complete
Just getting started

────

CURRENT MILESTONE

◉ Define Requirements
  Estimated: 1 week

[Task Checklist:
⬜ Interview stakeholders
⬜ Research user needs
⬜ Draft feature list
⬜ Get approval

💡 AI suggests starting with stakeholder interviews.

[Button: Add task] [Button: Edit tasks]
]

────

WHO'S HELPING?

Just you so far.
[+ Add team members]

────

[Button: Share update] [Button: Edit goal]
```

**AI Magic:**
- User created simple goal: "Launch customer dashboard"
- AI automatically created:
  - 5 milestones with timing
  - 4 tasks for first milestone
  - Suggested starting point

---

### SCREEN 10: Complete First Task

**Context:** User taps checkbox next to task

**Interaction Sequence:**
```
1. User taps ⬜ "Interview stakeholders"
2. Haptic feedback (tap)
3. Checkbox animates to ✅ (300ms)
4. Task text crosses out gently
5. Progress bar updates: 0% → 25%
6. Brief sparkle animation (1.5s): "✨ Nice! ✨"
7. Returns to normal view
```

**Updated View:**
```
CURRENT MILESTONE

◉ Define Requirements

[Task Checklist:
✅ Interview stakeholders (crossed out, gray)
⬜ Research user needs
⬜ Draft feature list
⬜ Get approval

Progress: 25%
●●○○○○○○○○
]
```

**Emotional Design:**
- Small win = small celebration
- Feels good, keeps momentum
- Progress immediately visible

---

### SCREEN 11: Back to FlowBoard (Progress Reflected)

**Context:** User returns to main screen

**Layout:**
```
😊 Sarah       [🔍 Search] [Profile Photo]

────

YOUR FOCUS TODAY

[Priority Card:
🎯 PRIORITY #1

Launch customer dashboard

📊 Progress: 25% ↑
🔥 High Impact

Next step:
"Research user needs"

[Button: Continue] [Button: View Goal]
]

────

COMPLETED TODAY

[Small Card:
✅ Interviewed stakeholders
1 hour ago
]

────

[+ Add task]    [See all >]

Bottom Nav: [📊 Goals] [💬 Team] [🎓 Grow] [👤 You]
```

**Smart Updates:**
- Progress automatically shown (25%)
- Next step changed
- "Completed Today" section appeared
- User sees progress immediately

---

### SCREEN 12: Explore Team Tab

**Context:** User taps "Team" in bottom nav

**Layout (First Time, Empty State):**
```
KUDOSSTREAM
[Filter ▾]         [+ Give] 🎉

────

💡 Welcome to KudosStream!

This is where your team shares appreciation. You'll see:
• Recognition you receive
• Team wins and milestones
• Company-wide highlights

See someone doing great work?
Tap the [+] button to say thanks!

[Button: Got it]

────

[Illustration: Two hands high-fiving]

Nothing here yet.
Be the first to give recognition!

[Primary Button: Give Recognition 🎉]
```

**Purpose:**
- First-time explainer
- Empty state is expected (new user)
- Clear CTA

---

### SCREEN 13: Give First Recognition (Selection)

**Context:** User taps "+ Give" button

**Layout:**
```
[< Cancel]    Give Recognition

────

Who helped you recently?

[Search Input: 🔍 Search people...]

YOUR TEAM

[List Item: Alex Martinez
Product Manager]

[List Item: Jordan Kim
Senior Designer]

[List Item: Sam Patel
Engineering Lead]

[+ See more teammates]

────

💡 Tip: Think about someone who helped you this week.
```

**Smart Features:**
- Shows immediate team members first
- Based on org chart
- Search for broader company

---

### SCREEN 14: Write Recognition

**Context:** User selected "Alex Martinez"

**Layout:**
```
[< Back]    Recognize Alex

────

What did Alex do?

[Text Area:
"Alex helped me think through the requirements for the dashboard project. Their questions helped me see"

[AI Suggestion Dropdown appears:]
• "gaps I hadn't considered"
• "what users really need"
• "the bigger picture"
]

💡 Great! Specific recognition means more.

────

Link to your goal? (optional)

⚫ Customer Dashboard Goal
⚪ Don't link

────

Visibility:
⚫ Public (team sees)
⚪ Private (just Alex)

────

[Primary Button: Send Recognition 🎉]
```

**AI Features:**
- Auto-completes as user types
- Real-time quality feedback
- Pre-selects relevant goal

---

### SCREEN 15: Recognition Sent (Celebration)

**Context:** User tapped "Send Recognition"

**Layout:**
```
[Full-screen takeover]

✨ 🎉 ✨

Recognition Sent!

[Confetti animation: 2 seconds]

Alex will love this!


[Secondary Button: View in KudosStream]
[Primary Button: Back to FlowBoard]

[Auto-dismisses to KudosStream after 3 seconds]
```

**Celebration:**
- Confetti falls
- Success message
- Brief, joyful moment

---

### SCREEN 16: KudosStream (With Content)

**Context:** Recognition posted, feed now has content

**Layout:**
```
KUDOSSTREAM
[Filter ▾]         [+ Give] 🎉

────

NOW

[Recognition Card:
👏 You recognized Alex
   Just now

"Alex helped me think through the requirements for the dashboard project. Their questions helped me see gaps I hadn't considered."

🔗 Customer Dashboard Goal

Be the first to resonate ❤️
]

────

💡 Great first recognition!
   Keep the momentum going.

   [Button: Dismiss]
```

**User Sees:**
- Their recognition at top
- Linked to goal (context)
- Encouraging message from AI
- Feed no longer empty!

---

## Phase 3: Second Day & Pattern Formation

### SCREEN 17: Day Closed (Evening Day 1)

**Context:** User completed daily reflection

**Layout:**
```
[Full screen, peaceful gradient]

[Moon Icon]

Day closed. ✨

Rest well, Sarah.

Tomorrow's ready when you are.

[Gentle fade-out animation: 2 seconds]
```

**Purpose:**
- Psychological closure
- Permission to disconnect
- Evening notifications muted

---

### SCREEN 18: Next Morning (Day 2)

**Context:** User opens app morning of Day 2

**Layout:**
```
[Same wake-up screen as Day 1]

Good morning, Sarah

Wednesday, October 29, 2025

[Sunrise Icon]

Ready for another great day?

[Button: Let's get started]
```

**Continuity:**
- Familiar ritual
- Different date
- Consistent experience

---

### SCREEN 19: Mood Check (Day 2)

**Context:** Morning check-in Day 2

**Layout:**
```
[< Skip]

How are you feeling about work today?

😊      😌      😐      😓      😰
Ready  Good  Okay  Tired Stressed

Yesterday you felt "Ready" 😊
at the end of the day.

[Tap to add context]
[Text Input: Optional note...]

[Primary Button: Continue →]
```

**AI Context:**
- Shows yesterday's closing mood
- Creates continuity
- Tracks patterns

---

### SCREEN 20: FlowBoard (Day 2, AI Adjustments)

**Context:** AI learned from yesterday

**Layout:**
```
😊 Sarah       [🔍 Search] [Profile Photo]

────

💡 Good morning! Based on what you said yesterday,
   here's your focus for today.
   [Dismiss]

YOUR FOCUS TODAY

[Priority Card:
🎯 PRIORITY #1

Research user needs

Part of: Customer Dashboard
📅 This week
🔥 High Impact

You planned this yesterday!

[Button: View Goal] [Button: Start This]
]

────

ALSO ON YOUR PLATE

[Small Card:
✅ Follow up with Alex on requirements
Suggested by AI
]

────
```

**AI Magic:**
- Priority is what user said yesterday: "Start user research"
- AI created follow-up task based on previous work
- Personalized message: "You planned this yesterday!"

**User sees continuity and intelligence.**

---

## Phase 4: Week Later - Patterns Emerge

### SCREEN 21: Weekly Summary (Monday Morning, Week 2)

**Context:** Auto-appears Monday morning

**Layout:**
```
[Card overlay on FlowBoard]

📊 YOUR WEEK IN REVIEW
   Oct 28 - Nov 3

🎯 Goals
• Customer Dashboard: 40%
  (+35% this week!)

😊 Wellbeing
• Mostly "Good" and "Ready"
• Energy steady all week

🙏 Recognition
• Received: 2 times
• Given: 1 time

💡 Insight:
You make fastest progress
Tuesday-Thursday mornings

[Button: View full summary]
[Button: Start this week]
```

**Purpose:**
- Weekly rhythm
- Pattern insights
- Celebration of progress

---

### SCREEN 22: Full Weekly Summary

**Context:** User taps "View full summary"

**Layout:**
```
[< Back]    Your Week (Oct 28 - Nov 3)

────

🎯 GOALS & PROGRESS

Customer Dashboard
●●●●○○○○○○ 40% complete
+35% this week

Milestones:
✅ Defined requirements
✅ Researched user needs
◉ Drafting feature list (now)

────

😊 YOUR ENERGY

Mon Tue Wed Thu Fri Sat Sun
 😊  😊  😌  😊  😌  -   -

Average: Good/Ready

Pattern: You start weeks strong
and energy stays steady.

────

🙏 RECOGNITION & IMPACT

Received (2):
• Alex: "Great requirements doc"
• Jordan: "User research helped"

Given (1):
• Alex: "Helped with planning"

Your work impacted:
→ Customer Dashboard project
→ Product team collaboration

────

💡 AI INSIGHT

You're most productive Tue-Thu
mornings. Consider scheduling
deep work then, meetings later.

[Button: Apply this insight]

────

🎯 NEXT WEEK

Focus: Finish feature list,
start design phase

[Button: Plan next week]
```

**Comprehensive view:**
- Progress quantified
- Patterns identified
- Actionable insights
- Forward-looking

---

## Phase 5: Goal Completion

### SCREEN 23: Goal Achieved (Month Later)

**Context:** User completes final task of goal

**Layout:**
```
[Full-screen takeover]

✨ 🏆 ✨

GOAL ACHIEVED!

Customer Dashboard Launched

[Full confetti animation + sound: 5 seconds]

Started: Oct 28
Completed: Nov 30
Duration: 33 days

Team: You, Alex, Jordan, Sam
Recognition: 8 times
Milestones: 5/5 complete


[Button: Share with team 🎉]
[Button: View your journey]
[Button: Set next goal]
```

**Big Celebration:**
- Full-screen (deserved!)
- 5-second confetti
- Optional sound
- Complete stats
- Multiple CTAs

---

### SCREEN 24: Goal Journey Visualization

**Context:** User taps "View your journey"

**Layout:**
```
[< Back]    Your Journey

Customer Dashboard Goal
Oct 28 - Nov 30, 2025 (33 days)

────

TIMELINE

●────●────●────●────●
Oct28 Nov4 Nov11 Nov19 Nov30
Start Reqs Research Design Launch

────

KEY MOMENTS

📅 Nov 4: Requirements approved
🙏 Nov 7: Alex recognized you
📅 Nov 11: User research complete
🙏 Nov 15: Jordan thanked you
📅 Nov 19: Design finalized
📅 Nov 30: Dashboard launched!

────

YOUR ENERGY THROUGH IT

[Line graph showing mood over time]

Week 1: 😊 High energy
Week 2: 😌 Steady progress
Week 3: 😓 Push before deadline
Week 4: 😊 Strong finish!

────

TEAM COLLABORATION

You worked with:
• Alex (12 interactions)
• Jordan (8 interactions)
• Sam (6 interactions)

Total recognition: 8 times

────

[Button: Download PDF] [Button: Share story]
```

**Narrative Format:**
- Not just data—a story
- Emotional journey shown
- Collaboration highlighted
- Shareable for reviews

---

## Phase 6: Quarterly Review

### SCREEN 25: Quarterly Report (3 Months In)

**Context:** End of Q4, auto-generated

**Layout:**
```
[< Back]    Your Q4 Story (2025)

────

🌟 WHAT A QUARTER! 🌟

────

🎯 GOALS ACHIEVED

• Customer Dashboard (launched)
• Team Onboarding Process (completed)
• Presentation Skills (developed)

Total: 3 goals, 100% success

────

😊 WELLBEING JOURNEY

[Graph: mood over 3 months]

Overall: Positive trajectory

You felt best when:
• Working on creative projects
• Collaborating with team
• Completing milestones

Challenging moments:
• Mid-November deadline crunch
• (Recovered quickly!)

────

🙏 RECOGNITION & IMPACT

Received: 24 recognitions
Given: 18 recognitions

Top themes:
🌟 "Clear communicator" (×8)
🤝 "Great teammate" (×6)
🎨 "Creative thinker" (×5)

You helped 15 colleagues
across 3 teams

────

📚 SKILLS DEVELOPED

Communication: Lvl 3 → Lvl 5
Leadership: Lvl 1 → Lvl 3
Product Strategy: Lvl 2 → Lvl 4

Learning completed: 8 courses

────

💡 AI CAREER INSIGHT

"Sarah, you've grown significantly
in communication and leadership
this quarter. You're ready for
larger scope.

Consider:
• Leading a cross-team project
• Mentoring a junior designer
• Presenting at company all-hands"

[Button: Discuss with manager]

────

[Button: Download full report (PDF)]
[Button: Share with manager]
[Button: Start planning Q1 2026]
```

**Comprehensive Growth Story:**
- Quantified achievements
- Emotional journey
- Skills progression
- Career guidance
- Professional export

---

## Supporting Screens

### SCREEN 26: Settings

**Context:** User tab → Settings

**Layout:**
```
[< Back]    Settings

────

ACCOUNT
[Profile & Preferences]
[Notification Settings]
[Connected Apps]

────

PRIVACY

🔒 Data You Control

PulseCheck Visibility:
⚫ Private (only me + AI)
⚪ Manager sees trends
⚪ Team sees current mood

[What can my manager see?] ℹ️

Goal Visibility:
⚫ Team only
⚪ Company-wide

Recognition Default:
⚫ Public
⚪ Private

────

ENGAGE COACH

Coaching Style:
⚪ Active (3-4x daily)
⚫ Moderate (1-2x daily)
⚪ Minimal (weekly)
⚪ Off

Quiet Hours:
⚫ 6:00 PM - 8:00 AM
[Customize...]

Weekend Messages:
⚫ Off (respect my time)
⚪ On

────

YOUR DATA
[Download everything (GDPR)]
[Delete my account]

────

HELP & ABOUT
[Help Center]
[Contact Support]
[Privacy Policy]
[Terms of Service]

Engage v1.0.0
```

**User Control:**
- Granular privacy
- Data portability
- Coaching adjustable
- Boundaries respected

---

### SCREEN 27: Notifications Center

**Context:** Bell icon tapped

**Layout:**
```
[< Back]    Notifications
                 [Mark all read]

────

TODAY

[Card: 🙏 New Recognition
Alex thanked you
1 hour ago
[View]]

[Card: 💡 Engage Coach
Break suggestion
3 hours ago
[Dismissed]]

────

YESTERDAY

[Card: ✍️ Feedback Received
Jordan responded
Yesterday, 4:20 PM
[Read]]

[Card: 🎯 Goal Milestone
Q4 Marketing: 75%
Yesterday, 2:05 PM
[Viewed]]

────

THIS WEEK

[Card: 📊 Weekly Summary Ready
Your week at a glance
Monday, 8:00 AM
[View summary]]
```

**Notification Types (Priority Order):**
1. Recognition 🙏 (Highest)
2. Feedback ✍️ (High)
3. Goal milestones 🎯 (Medium)
4. Coach messages 💡 (Low)
5. System updates 📊 (Lowest)

---

### SCREEN 28: Search

**Context:** Search icon tapped

**Layout (Empty State):**
```
[< Back]

[Search Input: 🔍 Search Engage...]

RECENT SEARCHES
• Q4 Marketing goal
• Alex's feedback
• Recognition from Jordan

────

QUICK ACTIONS
• Create new goal
• Give recognition
• Request feedback
• Check my progress
```

**Layout (While Typing "marketing"):**
```
[Search Input: 🔍 marketing▊]

GOALS
• Q4 Marketing Strategy (75%)
• Marketing Automation Project

PEOPLE
• Marketing Team

RECOGNITION
• "Great work on marketing deck" - Alex, Oct 25

FEEDBACK
• "Marketing presentation was clear" - Jordan, Oct 20
```

**Search Intelligence:**
- Instant results
- Categorized
- Searches: Goals, recognition, feedback, people, learning

---

### SCREEN 29: GrowthHub

**Context:** "Grow" tab tapped

**Layout:**
```
GROWTHHUB

────

YOUR DEVELOPMENT JOURNEY

[Card: 💬 FEEDBACK

• 2 new feedback responses
• 1 pending request to give

[View all feedback]]

────

[Card: 📚 LEARNING PATH

Current focus:
"Presentation Skills"

●●●○○○○○○○ 30% complete

Next: "Storytelling in
      Business" (15 min)

[Continue learning]]

────

[Card: 🎯 SKILL DEVELOPMENT

Communication ●●●●○○○○○○
Leadership    ●●○○○○○○○○
Strategy      ●●●○○○○○○○

[View skill map]]

────

ACTIONS

[Request Feedback]
[Start Learning Path]
[Review Feedback Themes]

────

💡 AI INSIGHT

"Based on recent feedback,
you excel at 'clear communication'
(mentioned 5x). This is a core
strength. Consider mentoring others?"

[Explore this idea]
```

---

### SCREEN 30: You Tab (Personal Dashboard)

**Context:** "You" icon tapped in bottom nav

**Layout:**
```
YOU

────

[Profile Photo]  Sarah Chen
Product Designer
Product Team @ Acme Co

[Edit Profile]

────

THIS QUARTER

[Stats Card:
🎯 3 Active Goals
🙏 24 Recognition Received
👏 18 Recognition Given
✍️ 12 Feedback Exchanges
📚 2 Skills Developing
]

[View full quarter report]

────

YOUR WORK PATTERNS

[Insights Card:
📊 Most productive:
   Tuesday-Thursday mornings

😊 Energy peaks:
   After team collaboration

🎯 Best work happens:
   When you have 2-hour
   focus blocks
]

[See detailed insights]

────

💡 AI CAREER INSIGHT

"You're strongest in execution
and collaboration. Consider
taking on a project lead role?"

[Explore this opportunity]

────

QUICK ACTIONS

[Reflect on today]
[Review my feedback]
[Download my data]
[Settings]
```

---

## The Complete Journey Summary

### From Screen 0 to Screen 30

```
ONBOARDING (Screens 0-7)
Launch → Auth → Profile → Goal → Mood → Tour

DAY 1 (Screens 8-16)
FlowBoard → Goal Detail → Complete Task →
Recognition → KudosStream

DAY 2 (Screens 17-20)
Close Day → Wake Up → Mood Check →
AI-Adjusted FlowBoard

WEEK 2 (Screens 21-22)
Weekly Summary → Full Report

MONTH 1 (Screens 23-24)
Goal Complete → Journey View

QUARTER 1 (Screen 25)
Quarterly Review

SUPPORTING (Screens 26-30)
Settings → Notifications → Search →
GrowthHub → You Tab
```

---

## Key Principles Applied

Every screen follows:

1. **Simplicity**: One clear primary action
2. **Humanity**: Warm language, never judgmental
3. **Intelligence**: AI guides, learns, adapts
4. **Privacy**: User controls visibility
5. **Celebration**: Wins are acknowledged
6. **Clarity**: Always know where you are

---

*This is the complete flow. Every screen. Every interaction. From zero to mastery.*

*Ready to build.*
