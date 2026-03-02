## 🤝 Contributing to NJ SecForge

First of all — thank you for contributing! 🚀
NJ SecForge is an open-source learning platform built to help developers understand web security through hands-on practice.

> Whether you fix a typo or build a new lab, every contribution matters.

---

## 🎯 Ways You Can Contribute

You can help NJ SecForge grow by:
- 🧪 Adding new OWASP labs
- 🐛 Fixing bugs
- 🎨 Improving UI/UX
- 📚 Enhancing learning explanations
- 🔐 Improving secure coding examples
- 📝 Improving documentation

---

## 🧪 Adding a New Lab

Each lab simulates a real vulnerability with Vulnerable vs Secure comparison.

---

1️⃣ Create a Lab Folder

Inside:

``` /labs/ ```

Create a new folder:

``` /labs/lab-name/ ```

Example:

``` /labs/xss/ ```

2️⃣ Required Files

Each lab must contain:

```

labs/lab-name/
│
├── vulnerable.js      # insecure implementation
├── secure.js          # fixed implementation
├── instructions.json  # lab metadata & learning content
└── reset.js           # (optional) reset environment

```
3️⃣ instructions.json Structure

Your lab must define:

1. title
2. OWASP category
3. difficulty
4. challenge goal
5. hints
6. learning explanation

Example:
```
{
  "title": "Cross-Site Scripting (XSS)",
  "owasp": "A05: Injection",
  "difficulty": "Easy",
  "goal": "Execute JavaScript in the browser",
  "hint": "Try HTML input",
  "learning": {}
}
```

4️⃣ Lab Requirements

✅ Must demonstrate a real vulnerability
✅ Must include a secure fix
✅ Must work in both modes:

   - vulnerable
   - secure

✅ Must include clear educational explanation.

---

## 🧱 Coding Guidelines

Please follow these principles:

- Keep code beginner-friendly
- Write readable and clean logic
- Add helpful comments
- Avoid unnecessary complexity
- Focus on learning value over clever code

---

## 🔐 Security Rules

NJ SecForge intentionally contains vulnerable code for learning.

Please ensure:

- No real exploits against external systems
- No malicious payloads
- Safe local-only demonstrations
- Educational intent only

## Testing Before PR

> Before submitting:

```
npm install
node server.js
```

> Verify:

- Lab loads correctly
- Vulnerable mode works
- Secure mode blocks attack
- Reset works (if applicable)
- No server errors

---

## 🚀 Submitting a Pull Request

1. Fork the repository
2. Create a new branch
```
git checkout -b feature/new-lab-name
```

3. Commit your changes
```
git commit -m "Add XSS reflected lab"
```

4. Push branch
```
git push origin feature/new-lab-name
```

5. Open a Pull Request

### 💬 Pull Request Guidelines

Include:

What the lab teaches
- OWASP category
- Difficulty level
- Screenshots (optional but helpful)

---

## ❤️ Community Values

NJ SecForge is built on:

- Learning
- Respect
- Collaboration
- Ethical security education

Be kind, constructive, and supportive.

---

## 👨‍💻 Maintainer

Jagganraj
Creator of NJ SecForge
Built with ❤️ under njwebdesigning

🔐 Learn • Hack • Secure • Repeat