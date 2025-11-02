export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  trainerScript: string;
  visualSuggestion: string;
  example: string;
  quiz: Quiz[];
}

export const module1Lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Introduction to Testing & QA Mindset",
    trainerScript: `Welcome to Module 1 of AI-Powered Automation Testing! I'm so excited you're here.

Let me start with a question: Have you ever downloaded an app, and it crashed the moment you opened it? Or tried to checkout online, only to find the payment button doesn't work? Frustrating, right?

That's where we come in—as testers, we're the guardians of quality. We ensure software works as expected before it reaches real users.

But testing isn't just about finding bugs. It's a mindset. It's about thinking like a user, like a hacker, and like a business owner—all at once. You ask: "What could go wrong here?" "What if someone enters invalid data?" "What happens under heavy load?"

As we move into 2025, the role of testers is evolving rapidly. AI is automating repetitive tasks, which means testers now need to focus on strategy, critical thinking, and exploratory testing. This course will prepare you for that future.

Throughout this module, we'll build a strong foundation in manual testing, understand the testing lifecycle, and prepare you to transition into automation—and eventually, AI-driven testing.

Let's get started!`,
    visualSuggestion: "Show a professional title slide with 'Module 1: Foundation' in bold. Use a teal gradient background. Display icons representing a magnifying glass (bug hunting), a shield (quality assurance), and a lightbulb (critical thinking). Fade in each icon while speaking about the QA mindset.",
    example: `Think of a tester like a movie critic who watches a film before its release. The critic doesn't just look for technical flaws—they evaluate the story, the pacing, the user experience. Similarly, a tester doesn't just check if code works—they ensure the entire user journey is smooth, intuitive, and bug-free.

Real-world example: In 2023, a major bank released a mobile app update that allowed users to see other people's account balances. This critical bug slipped through because testing wasn't thorough enough. One tester with a sharp QA mindset could have prevented millions in losses and reputational damage.`,
    quiz: [
      {
        question: "What is the primary role of a QA tester?",
        options: [
          "To write code for developers",
          "To ensure software quality and prevent defects from reaching users",
          "To manage project timelines",
          "To design user interfaces"
        ],
        correctAnswer: 1,
        explanation: "QA testers are responsible for ensuring software quality by identifying defects and validating that the application meets requirements before it reaches end users."
      },
      {
        question: "Which of these is NOT part of a QA mindset?",
        options: [
          "Thinking like a user",
          "Asking 'what could go wrong?'",
          "Writing production code",
          "Testing edge cases and boundary conditions"
        ],
        correctAnswer: 2,
        explanation: "Writing production code is the responsibility of developers. QA testers focus on validating functionality, thinking critically about potential issues, and ensuring quality."
      }
    ]
  },
  {
    id: "lesson-2",
    title: "Software Development Life Cycle (SDLC) vs Software Testing Life Cycle (STLC)",
    trainerScript: `Now that we understand the QA mindset, let's talk about where testing fits into the bigger picture.

Every software project follows a lifecycle—from initial planning to deployment and maintenance. This is called the Software Development Life Cycle, or SDLC.

The most common SDLC models you'll encounter are:
• Waterfall - where each phase is completed sequentially
• Agile - where development happens in iterative sprints
• DevOps - which emphasizes continuous integration and delivery

Now, here's the key: Testing isn't just one phase at the end. That's old-school thinking. In modern development, testing happens at every stage.

This is where the Software Testing Life Cycle—STLC—comes in. STLC is a subset of SDLC that focuses specifically on testing activities. It includes:

1. Requirement Analysis - understanding what needs to be tested
2. Test Planning - defining the testing strategy and scope
3. Test Case Development - writing detailed test scenarios
4. Environment Setup - preparing the testing infrastructure
5. Test Execution - actually running the tests
6. Test Closure - documenting results and lessons learned

Think of SDLC as the entire journey of building a house, while STLC is specifically the quality inspection process that happens at each construction phase.

In Agile environments, STLC activities happen within each sprint, not at the end. This is called "shift-left testing"—moving testing earlier in the development process.

Understanding both SDLC and STLC helps you know when and how to contribute as a tester throughout the project lifecycle.`,
    visualSuggestion: "Display two parallel flowcharts side by side. Left side: SDLC phases (Requirements → Design → Development → Testing → Deployment → Maintenance) in blue boxes. Right side: STLC phases (Requirement Analysis → Test Planning → Test Case Development → Environment Setup → Test Execution → Test Closure) in teal boxes. Use arrows to show how STLC phases map to SDLC phases. Add a callout box highlighting 'Shift-Left Testing' concept.",
    example: `Imagine you're building a house:

SDLC is the entire construction process:
- Planning (architecture, budget)
- Foundation (infrastructure setup)
- Construction (building the structure)
- Inspection (quality checks)
- Handover (moving in)
- Maintenance (ongoing repairs)

STLC is the quality inspection that happens at EVERY stage:
- Before construction: Review blueprints for code compliance
- During foundation: Check concrete quality and measurements
- During construction: Inspect electrical wiring, plumbing
- Before handover: Final walkthrough and defect list
- After handover: Warranty checks

Real-world example: A fintech company using Agile noticed that bugs found in production were costing 10x more to fix than bugs caught during development. By implementing shift-left testing and integrating STLC into each sprint, they reduced production bugs by 65% in six months.`,
    quiz: [
      {
        question: "What does 'shift-left testing' mean?",
        options: [
          "Moving the QA team to a different office",
          "Testing earlier in the development lifecycle",
          "Reducing the number of test cases",
          "Automating all manual tests"
        ],
        correctAnswer: 1,
        explanation: "Shift-left testing means moving testing activities earlier in the development process, allowing teams to catch and fix defects sooner when they're less expensive to resolve."
      },
      {
        question: "In which SDLC model does testing happen continuously throughout development?",
        options: [
          "Waterfall only",
          "Agile and DevOps",
          "V-Model only",
          "None of the above"
        ],
        correctAnswer: 1,
        explanation: "Agile and DevOps methodologies emphasize continuous testing throughout development cycles, unlike Waterfall where testing is typically a distinct phase after development."
      }
    ]
  },
  {
    id: "lesson-3",
    title: "Manual Testing Essentials - Test Scenarios & Test Cases",
    trainerScript: `Let's dive into the heart of manual testing: creating test scenarios and test cases.

First, what's the difference?

A test scenario is a high-level description of what to test. It's broad and user-focused.
Example: "Verify user can successfully log into the application"

A test case is a detailed, step-by-step instruction for how to test something. It includes specific inputs, actions, and expected results.

Here's the anatomy of a good test case:
• Test Case ID - unique identifier (e.g., TC_LOGIN_001)
• Test Description - what you're testing
• Preconditions - what must be true before testing
• Test Steps - numbered, clear instructions
• Test Data - specific inputs to use
• Expected Result - what should happen
• Actual Result - what actually happened
• Status - Pass/Fail

Let me give you a practical example:

Test Scenario: User Login
Test Case ID: TC_LOGIN_001
Description: Verify login with valid credentials
Preconditions: User account exists in the database

Test Steps:
1. Navigate to login page
2. Enter valid email: test@example.com
3. Enter valid password: Test@123
4. Click Login button

Expected Result: User is redirected to dashboard with welcome message
Actual Result: (filled during execution)
Status: (Pass/Fail)

Now, here's what separates good testers from great ones: thinking beyond the happy path.

What about invalid credentials? Empty fields? SQL injection attempts? Password with special characters? These are called negative test cases, and they're just as important as positive ones.

A well-written test case should be so clear that anyone on the team could execute it and get the same result.`,
    visualSuggestion: "Show a split screen. Left: 'Test Scenario' box with a high-level description. Right: Expanded 'Test Case' template with all fields filled in. Use color coding: green for preconditions, blue for steps, orange for expected results. Animate the expansion from scenario to detailed test case. Include a checklist icon showing test case components.",
    example: `Think of a test scenario as a recipe name: "Chocolate Chip Cookies"

The test case is the detailed recipe:
• Ingredients (test data): 2 cups flour, 1 cup sugar, etc.
• Preparation (preconditions): Preheat oven to 350°F
• Steps: Mix ingredients, shape dough, bake for 12 minutes
• Expected result: Golden-brown cookies, soft in center
• Quality check: Taste and texture validation

Real-world example: An e-commerce company was experiencing cart abandonment. Through detailed test cases, testers discovered that users with items over $500 couldn't complete checkout—the payment gateway had an undocumented limit. This bug was only found because testers wrote test cases with various price points, not just the happy path of $10 purchases.

Pro tip: Great test cases are:
- Clear: Anyone can execute them
- Concise: No unnecessary steps
- Complete: Cover all scenarios
- Consistent: Follow a standard format`,
    quiz: [
      {
        question: "What is the main difference between a test scenario and a test case?",
        options: [
          "Test scenarios are automated, test cases are manual",
          "Test scenarios are high-level descriptions, test cases are detailed step-by-step instructions",
          "Test scenarios are for functional testing, test cases are for non-functional testing",
          "There is no difference"
        ],
        correctAnswer: 1,
        explanation: "A test scenario is a high-level description of what to test (e.g., 'User Login'), while a test case provides detailed steps, test data, and expected results for executing that scenario."
      },
      {
        question: "Which of these is a 'negative test case'?",
        options: [
          "Login with valid username and password",
          "Login with empty username field",
          "View user dashboard after successful login",
          "Update profile with valid information"
        ],
        correctAnswer: 1,
        explanation: "A negative test case validates how the system handles invalid, incorrect, or unexpected inputs. Testing login with an empty username field is a negative test case."
      }
    ]
  },
  {
    id: "lesson-4",
    title: "Defect Life Cycle",
    trainerScript: `You've found a bug! Now what?

Understanding the defect life cycle is crucial because a bug isn't just "found" and "fixed"—it goes through multiple stages, and different people are involved at each step.

Let me walk you through the journey of a bug from discovery to closure:

1. NEW - You've discovered the bug and logged it in the defect tracking system (like Jira, Azure DevOps, or Bugzilla). You provide clear steps to reproduce, screenshots, and environment details.

2. ASSIGNED - The project manager or lead assigns the bug to a developer. Priority and severity are reviewed.

3. OPEN - The developer acknowledges the bug and starts investigating.

4. FIXED - The developer believes they've resolved the issue and deploys the fix to the test environment.

5. RETEST - You, the tester, verify the fix. Does it actually solve the problem? Does it introduce new bugs?

6. VERIFIED - You confirm the bug is fixed. It works as expected!

Or... 6b. REOPENED - The bug still exists or the fix created new issues. Back to the developer it goes.

7. CLOSED - The bug is officially resolved and documented.

Sometimes bugs have other statuses:
• DEFERRED - We'll fix it in a future release
• REJECTED - Not actually a bug (working as designed)
• DUPLICATE - This bug was already reported

Now, here's what makes you valuable: A well-written bug report is the difference between a bug being fixed in hours vs. days.

Your bug report should include:
• Clear title (not "Login broken" but "Login fails with error 500 when using special characters in password")
• Steps to reproduce (numbered, precise)
• Expected vs. actual behavior
• Environment details (browser, OS, version)
• Screenshots or screen recordings
• Severity and priority
• Any relevant logs or error messages

Remember: Developers aren't psychic. The clearer your bug report, the faster the fix.`,
    visualSuggestion: "Show a circular flow diagram illustrating the defect lifecycle. Start with 'NEW' at the top, flowing clockwise through ASSIGNED → OPEN → FIXED → RETEST → VERIFIED → CLOSED. Add a branch from RETEST back to OPEN (REOPENED). Use color coding: red for open bugs, yellow for in-progress, green for closed. Add icons: magnifying glass for NEW, wrench for FIXED, checkmark for VERIFIED. Include a side panel showing a sample bug report template.",
    example: `Imagine you're a detective investigating a crime:

A bad bug report: "The website doesn't work"
(This is like saying "something bad happened somewhere")

A good bug report:
• Title: "Payment processing fails for Visa cards ending in 4 digits"
• Steps to reproduce:
  1. Add item to cart ($50 item)
  2. Proceed to checkout
  3. Enter Visa card: 4532 1111 1111 1234
  4. Click "Pay Now"
• Expected: Payment succeeds, order confirmation shown
• Actual: Error message "Invalid card" appears, payment fails
• Environment: Chrome 120, Windows 11, Production server
• Severity: High (blocking revenue)
• Screenshot: Attached
• Note: Works fine with Mastercard

Real-world example: A tester at a healthcare company found a bug where patient records were disappearing. Their detailed report included exact timestamps, user roles, and reproduction steps. This bug was fixed within 4 hours. Another tester reported "data is missing sometimes"—that bug took 3 weeks to resolve because developers couldn't reproduce it.

The difference? Clear communication and detailed documentation.`,
    quiz: [
      {
        question: "What is the correct sequence in a typical defect lifecycle?",
        options: [
          "NEW → FIXED → ASSIGNED → RETEST → CLOSED",
          "NEW → ASSIGNED → OPEN → FIXED → RETEST → VERIFIED → CLOSED",
          "ASSIGNED → NEW → FIXED → CLOSED",
          "OPEN → FIXED → CLOSED"
        ],
        correctAnswer: 1,
        explanation: "The standard defect lifecycle flows: NEW (bug discovered) → ASSIGNED (assigned to developer) → OPEN (developer working on it) → FIXED (fix deployed) → RETEST (tester verifies) → VERIFIED (confirmed fixed) → CLOSED (officially resolved)."
      },
      {
        question: "Which information is LEAST important in a bug report?",
        options: [
          "Steps to reproduce the bug",
          "The tester's personal opinion about the developer",
          "Expected vs. actual behavior",
          "Environment and system details"
        ],
        correctAnswer: 1,
        explanation: "Personal opinions are never appropriate in bug reports. Bug reports should be objective, factual, and focused on technical details needed to reproduce and fix the issue."
      }
    ]
  },
  {
    id: "lesson-5",
    title: "Transition from Manual to Automation",
    trainerScript: `Let's address the question I hear most often: "Should I learn automation, or will AI replace me?"

Here's the truth: Manual testing isn't going away, but it's evolving. And yes, you absolutely should learn automation—not because manual testing is obsolete, but because the combination of manual and automated testing makes you incredibly valuable.

Think of it this way: Manual testing is exploring a city on foot—you notice details, have intuition, and can adapt to unexpected situations. Automation is like having a car—it's faster for repetitive routes, but you still need to know where you're going.

So when should you automate?

Automate when:
• Tests need to run repeatedly (regression testing)
• Tests are time-consuming and tedious
• You need to test across multiple environments or browsers
• You need to run tests overnight or in parallel
• The functionality is stable and unlikely to change frequently

Don't automate when:
• The feature is brand new and constantly changing
• The test requires human judgment (UX, visual design)
• It's a one-time test
• The automation effort exceeds the manual testing time

Here's a practical framework: The Test Automation Pyramid

At the base (most tests): Unit tests - fast, cheap, automated
Middle layer: Integration/API tests - moderate speed, good ROI
Top layer (fewest tests): UI tests - slow, expensive, brittle

The pyramid teaches us: Automate more at lower levels, and reserve UI automation for critical user flows.

Now, here's what makes automation powerful in 2025: AI is enhancing automation, not replacing it. AI can:
• Generate test scripts from manual test cases
• Self-heal broken selectors
• Suggest additional test scenarios
• Analyze patterns in test failures

But AI still needs you—the human tester—to define what's important, interpret results, and make judgment calls.

Your career path? Start with strong manual testing foundations (which you're building now), then layer in automation skills (Selenium, Playwright), and finally embrace AI-powered tools. This makes you a "T-shaped tester"—deep expertise in testing, broad knowledge of automation and AI.`,
    visualSuggestion: "Show a visual comparison: left side shows a person manually clicking through tests (labeled 'Manual: Flexible, Intuitive'), right side shows a robot/automation icon running tests (labeled 'Automation: Fast, Repeatable'). Below, display the Test Automation Pyramid as a triangle divided into three sections: broad base labeled 'Unit Tests (70%)', middle section 'API Tests (20%)', small top section 'UI Tests (10%)'. Add a banner at the top: 'Manual + Automation = Powerful Tester'. Include a timeline showing evolution: 2010 (mostly manual) → 2025 (balanced) → future (AI-enhanced).",
    example: `Think of automation like a dishwasher:

You still need to load the dishes properly (write good test scripts)
You need to know which dishes can go in the dishwasher (what to automate)
You need to check if dishes came out clean (validate test results)
You still hand-wash delicate items (manual exploratory testing)

Real-world example: A SaaS company had a login feature that needed testing:
• Manual testing time: 15 minutes per test
• Tests needed: 3 times per day (after each deployment)
• Manual effort: 45 minutes daily = 3.75 hours weekly

After automation:
• Automated test execution: 2 minutes
• Manual effort: Just reviewing results = 10 minutes weekly

That's 3.5 hours saved per week = 182 hours per year = almost a full month!

But here's the catch: They still used manual testing for:
- New login features (too unstable to automate yet)
- UX evaluation (does the button color inspire trust?)
- Exploratory testing (what if I paste a 10,000-character password?)

The sweet spot? Automate the repetitive, manual test the creative.`,
    quiz: [
      {
        question: "According to the Test Automation Pyramid, which type of tests should you have the MOST of?",
        options: [
          "UI/End-to-End tests",
          "Manual exploratory tests",
          "Unit tests",
          "Performance tests"
        ],
        correctAnswer: 2,
        explanation: "The Test Automation Pyramid recommends having the most unit tests (base of pyramid) because they're fast, stable, and cost-effective. UI tests should be fewer (top of pyramid) as they're slower and more brittle."
      },
      {
        question: "Which scenario is the BEST candidate for test automation?",
        options: [
          "A brand-new feature that's still being designed",
          "Regression testing that runs after every deployment",
          "One-time data migration validation",
          "Evaluating the visual appeal of a new UI design"
        ],
        correctAnswer: 1,
        explanation: "Regression testing that runs repeatedly is ideal for automation because it saves time on repetitive tasks. Features still in flux, one-time tests, and subjective evaluations are better suited for manual testing."
      }
    ]
  },
  {
    id: "lesson-6",
    title: "Evolution of Automation Tools - QTP to AI Testing",
    trainerScript: `Let's take a journey through the history of automation testing. Understanding where we've been helps you appreciate where we're going.

Phase 1: The Record-and-Playback Era (2000-2010)
Tools like QTP (QuickTest Professional, later UFT) and Selenium IDE dominated. You'd record your manual actions, and the tool would replay them. Sounds great, right?

The problem: These scripts were brittle. Change one button ID, and your entire test suite breaks. Maintenance became a nightmare.

Phase 2: The Code-Based Framework Era (2010-2018)
Selenium WebDriver changed everything. Instead of record-and-playback, you wrote code to interact with web elements. Suddenly, automation became programming.

Benefits:
• More flexible and powerful
• Better suited for CI/CD pipelines
• Reusable frameworks and page object models

Challenges:
• Steep learning curve for manual testers
• Slow execution on UI tests
• Flaky tests that pass sometimes, fail other times

Phase 3: The Modern Testing Era (2018-2023)
Tools like Cypress and Playwright emerged with:
• Faster execution
• Better debugging
• Built-in waiting and retry logic
• Cross-browser support out of the box

Playwright, in particular, became a favorite because it works with multiple languages, handles modern web frameworks (React, Angular), and has excellent developer experience.

Phase 4: The AI-Powered Era (2023-Present)
Now we're seeing AI revolutionize testing:

AI-Powered Test Generation:
• Tools like Testim.io and Applitools use AI to generate tests from requirements
• You describe what to test in plain English, AI creates the script

Self-Healing Tests:
• AI detects when element selectors change and automatically updates them
• Reduces maintenance time by 60-80%

Visual AI Testing:
• AI compares screenshots pixel-by-pixel across browsers
• Detects visual regressions humans might miss

Intelligent Test Prioritization:
• AI analyzes code changes and predicts which tests are most likely to fail
• Runs high-risk tests first

Autonomous Testing:
• AI explores applications like a human tester would
• Discovers edge cases and unexpected behaviors

Here's what this means for you: The tools are getting smarter, but they still need intelligent humans to guide them. Your job is shifting from "execute tests" to "design test strategy."

In this course, we'll focus on Playwright—the cutting-edge tool that bridges traditional automation with AI-ready practices—while preparing you to leverage AI tools effectively.`,
    visualSuggestion: "Create a timeline graphic showing the evolution of testing tools. From left to right: (2000s) QTP icon with 'Record & Playback', (2010s) Selenium logo with 'Code-Based', (2018+) Playwright/Cypress logos with 'Modern & Fast', (2023+) AI/robot icon with 'AI-Powered'. Use a gradient color progression from gray (old) to bright teal (modern). Add key characteristics under each era. Include a comparison table showing test execution time improvement over the years.",
    example: `Think of automation tools evolution like transportation:

QTP/Record-Playback = Horse and Buggy
• Got you there, but slow and required constant maintenance
• If the road changed, you couldn't navigate

Selenium WebDriver = Manual Transmission Car
• Much faster and more powerful
• But you need to know how to drive (coding required)
• Still breaks down if conditions change

Playwright = Modern Electric Car with Autopilot
• Fast, efficient, smart features built-in
• Self-adjusts to conditions
• Still need a driver, but less effort required

AI Testing = Fully Autonomous Vehicle (emerging)
• Learns from experience
• Adapts to new situations
• Still needs human oversight and direction

Real-world example: A fintech company migrated from Selenium to Playwright:
• Test execution time: Reduced from 4 hours to 45 minutes
• Flaky tests: Dropped from 25% to 5%
• Maintenance time: 60% reduction due to better selectors and auto-waiting

Then they added AI-powered self-healing:
• Maintenance time: Additional 40% reduction
• Tests that broke after UI changes: Fixed automatically 80% of the time

The lesson? Each generation of tools makes testing faster, more reliable, and less painful—but you still need to know the fundamentals.`,
    quiz: [
      {
        question: "What was the main limitation of early record-and-playback tools like QTP?",
        options: [
          "They were too expensive",
          "They created brittle tests that broke easily when the UI changed",
          "They only worked on Windows",
          "They couldn't test web applications"
        ],
        correctAnswer: 1,
        explanation: "Record-and-playback tools created tests that were tightly coupled to specific UI elements. When element IDs or layouts changed, tests would break, requiring extensive maintenance."
      },
      {
        question: "What is 'self-healing' in AI-powered test automation?",
        options: [
          "Tests that fix bugs in the application automatically",
          "Tests that automatically update selectors when UI elements change",
          "Tests that run themselves without human intervention",
          "Tests that generate their own test data"
        ],
        correctAnswer: 1,
        explanation: "Self-healing refers to AI's ability to detect when element selectors change (like a button ID or CSS class) and automatically update the test script to use the new selector, reducing maintenance effort."
      }
    ]
  },
  {
    id: "lesson-7",
    title: "Hands-on Exercise: Write Test Scenarios for E-commerce Login",
    trainerScript: `Alright, it's time to put everything we've learned into practice!

Your assignment: Write comprehensive test scenarios and test cases for an e-commerce website's login functionality.

Here's the context: You're testing the login page for "TechMart," an online electronics store. The login page has:
• Email field
• Password field
• "Remember me" checkbox
• "Login" button
• "Forgot password?" link
• "Sign up" link

Your task has three parts:

Part 1: Identify Test Scenarios
List all the high-level scenarios you need to test. Think both positive and negative cases. Consider:
- Valid login
- Invalid credentials
- Empty fields
- Security aspects
- UI/UX elements

Part 2: Write Detailed Test Cases
For at least 5 scenarios, write complete test cases including:
- Test Case ID
- Description
- Preconditions
- Test Steps
- Test Data
- Expected Results

Part 3: Categorize for Automation
For each test case, decide:
- Should this be automated? Why or why not?
- If automated, what's the priority? (High/Medium/Low)

Here are some scenarios to get you started, but I want you to think of more:

1. Valid login with correct credentials
2. Login with incorrect password
3. Login with unregistered email
4. Login with empty email field
5. Login with empty password field
6. Login with SQL injection attempt
7. "Remember me" functionality
8. Password visibility toggle (if applicable)
9. Login session timeout
10. Cross-browser compatibility

As you work through this, ask yourself:
• What could a malicious user try?
• What might a confused user do by mistake?
• What are the edge cases?

Bonus challenge: Map each test case to a specific phase of the STLC we discussed earlier.

Take your time with this exercise. In the real world, thorough test planning prevents bugs from reaching production. A well-designed test suite is the mark of a professional tester.

When you're done, compare your test cases with a colleague or mentor. You'll be surprised how different people think of different scenarios—that's the beauty of diverse testing perspectives!

In the next module, we'll take these same test cases and start automating them with Selenium and Playwright. So the work you do now directly translates to automation practice later.

Good luck, and remember: there's no such thing as too many test cases—only untested scenarios waiting to become production bugs!`,
    visualSuggestion: "Show a sample login page mockup for 'TechMart' with labeled elements (email field, password field, buttons). Display a template test case format on the side. Include a decision flowchart: 'Should this be automated?' with branches for Yes (repetitive, stable) and No (one-time, exploratory). Add a checklist of considerations: Positive tests ✓, Negative tests ✓, Security tests ✓, Edge cases ✓. Show a sample completed test case as a reference.",
    example: `Let me show you a real-world example of how thorough testing prevents disasters:

Scenario: Login with special characters in password

Why this matters: In 2022, a major e-commerce platform had a bug where passwords containing apostrophes (') would fail during login, even though the same passwords worked fine during registration. This happened because the login form didn't properly escape special characters.

Test Case ID: TC_LOGIN_008
Description: Verify login with password containing special characters
Preconditions: User registered with password: Test@Pass'2024!

Test Steps:
1. Navigate to https://techmart.com/login
2. Enter email: john.doe@email.com
3. Enter password: Test@Pass'2024!
4. Click Login button

Expected Result: User successfully logs in and is redirected to dashboard
Actual Result: [To be filled during execution]
Status: [Pass/Fail]

Automation Candidate: YES - High Priority
Reason: Security-related, needs to run in every regression cycle

Another example—Edge Case Testing:

Test Case ID: TC_LOGIN_015
Description: Verify login attempt with copy-pasted password containing trailing spaces
Preconditions: User registered with password "SecurePass123"

Test Steps:
1. Navigate to login page
2. Enter valid email
3. Copy password "SecurePass123 " (note the trailing space)
4. Paste into password field
5. Click Login

Expected Result: System either trims spaces and logs in successfully, OR displays clear error message
Actual Result: [To be filled]

Why this matters: Users often copy-paste passwords from password managers, which might include extra spaces. Your test cases should account for real user behavior.

Pro tip: When writing test cases, use the "5 Whys" technique:
1. Why test with special characters? → Users have complex passwords
2. Why do users have complex passwords? → Security requirements
3. Why might this fail? → Poor input validation
4. Why does that matter? → Prevents legitimate users from logging in
5. Why is that critical? → Revenue loss and frustrated customers

This deep thinking separates good testers from great ones.`,
    quiz: [
      {
        question: "Which of the following login scenarios should have the HIGHEST priority for automation?",
        options: [
          "Testing login with 50 different valid user accounts",
          "Evaluating the visual appeal of the login button color",
          "Testing login once with valid credentials to ensure basic functionality",
          "Checking if the login page loads properly on a new experimental browser"
        ],
        correctAnswer: 0,
        explanation: "Testing with multiple valid accounts is highly repetitive, time-consuming, and needs to run frequently—making it an excellent candidate for automation. Visual evaluations and experimental browsers are better suited for manual testing."
      },
      {
        question: "In a test case for 'Login with SQL injection attempt', what would be appropriate test data?",
        options: [
          "Email: test@test.com, Password: password123",
          "Email: admin' OR '1'='1, Password: ' OR '1'='1",
          "Email: [blank], Password: [blank]",
          "Email: verylongemailaddress@domain.com, Password: short"
        ],
        correctAnswer: 1,
        explanation: "SQL injection tests should use malicious SQL code patterns like ' OR '1'='1 to verify the application properly sanitizes input and prevents unauthorized access. This is a critical security test."
      },
      {
        question: "Why is it important to test 'Remember Me' functionality as a separate test case?",
        options: [
          "It's required by law in most countries",
          "It involves session management and cookie handling, which are separate concerns from basic authentication",
          "It makes the test suite look more comprehensive",
          "It's the most common feature users interact with"
        ],
        correctAnswer: 1,
        explanation: "'Remember Me' involves session persistence, cookie management, and security implications (like token expiration) that are distinct from basic login validation. Testing it separately ensures these specific mechanisms work correctly."
      }
    ]
  }
];
