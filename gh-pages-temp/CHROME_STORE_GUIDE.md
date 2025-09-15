# 🚀 Chrome Web Store Upload Guide

## **Prerequisites**

### **1. Google Developer Account**

- Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
- Sign in with your Google account
- Pay the **one-time $5 registration fee** (required for all developers)
- Complete the developer registration process

### **2. Extension Package Ready**

✅ **Package created**: `chrome-store-package.zip` (ready for upload)
✅ **Size**: Optimized and compressed
✅ **Manifest V3**: Compliant with latest Chrome standards

---

## **📋 Step-by-Step Upload Process**

### **Step 1: Access Developer Dashboard**

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Click **"Add new item"**
3. Click **"Choose file"** and select `chrome-store-package.zip`

### **Step 2: Fill Store Listing Information**

#### **Basic Information**

- **Name**: `Linear Ticket Link Formatter`
- **Summary**: `Format Linear ticket links into organized markdown lists with automatic categorization by type (Bug, Improvement, Normal).`
- **Description**:

```
Transform your Linear ticket links into beautifully organized markdown lists!

🎯 **Key Features:**
• Automatic categorization by ticket type (Bug, Improvement, Normal)
• Right-click context menu for quick access
• Keyboard shortcuts (Ctrl+Shift+L, Ctrl+Shift+F)
• Auto-format functionality with clipboard integration
• Clean, organized output for documentation

🚀 **How to Use:**
1. Right-click anywhere on a webpage
2. Select "Linear Ticket Link Formatter"
3. Your clipboard data is automatically pasted and formatted
4. Copy the formatted result

Perfect for developers, project managers, and teams who work with Linear tickets and need to create organized documentation or reports.

✨ **Auto-Format Magic:**
The extension automatically detects Linear ticket links in your clipboard and formats them into categorized lists, saving you time and ensuring consistency across your documentation.
```

#### **Category**

- **Category**: `Productivity`
- **Language**: `English (United States)`

#### **Screenshots** (Required)

You'll need to create screenshots showing:

1. **Main popup interface** with formatted output
2. **Context menu** in action
3. **Before/after comparison** of ticket formatting
4. **Settings or options** (if any)

#### **Icons** (Already included)

✅ **16x16**: `icons/icon-16.png`
✅ **48x48**: `icons/icon-48.png`
✅ **128x128**: `icons/icon-128.png`

### **Step 3: Privacy & Permissions**

#### **Permissions Explanation**

- **Storage**: Save user preferences and formatting history
- **Context Menus**: Enable right-click functionality
- **Active Tab**: Access current page for clipboard integration
- **Clipboard Read/Write**: Read clipboard data and copy formatted results
- **Notifications**: Show success/error messages
- **Scripting**: Execute clipboard reading on web pages

#### **Privacy Policy** (Required)

You'll need to create a privacy policy. Here's a template:

```
Privacy Policy for Linear Ticket Link Formatter

Data Collection:
- This extension does not collect, store, or transmit any personal data
- All processing happens locally in your browser
- No data is sent to external servers

Data Storage:
- User preferences are stored locally in your browser
- Formatting history is stored locally (optional feature)
- Clipboard data is processed locally and not stored permanently

Permissions:
- Storage: For saving user preferences
- Context Menus: For right-click functionality
- Active Tab: For clipboard access
- Clipboard: For reading and writing formatted text
- Notifications: For user feedback
- Scripting: For clipboard access on web pages

Contact: [Your email]
```

### **Step 4: Store Listing Details**

#### **Promotional Images** (Optional but recommended)

- **Small tile**: 128x128px
- **Large tile**: 440x280px
- **Marquee**: 1400x560px

#### **Website** (Optional)

- Link to your GitHub repository or project page

#### **Support Email**

- Your contact email for user support

### **Step 5: Review & Submit**

#### **Before Submitting Checklist**

- [ ] Package uploaded successfully
- [ ] All required fields filled
- [ ] Screenshots uploaded
- [ ] Privacy policy created and linked
- [ ] Permissions explained
- [ ] Description is clear and compelling
- [ ] Icons are properly sized and clear

#### **Submit for Review**

1. Click **"Submit for review"**
2. Wait for Google's review process (typically 1-3 business days)
3. Check your email for updates

---

## **🔧 Troubleshooting Common Issues**

### **Package Upload Issues**

- **File too large**: Ensure package is under 2MB
- **Invalid manifest**: Check manifest.json syntax
- **Missing icons**: Verify all required icon sizes are present

### **Review Rejections**

- **Privacy policy missing**: Create and link a privacy policy
- **Permissions unclear**: Provide clear explanations for each permission
- **Screenshots required**: Add clear screenshots of the extension in action
- **Description too short**: Provide detailed, compelling description

### **Manifest Issues**

- **Version format**: Use semantic versioning (e.g., 1.0.0)
- **Permissions**: Only request necessary permissions
- **Content Security Policy**: Ensure CSP is properly configured

---

## **📊 Post-Upload Management**

### **Monitoring**

- Check developer dashboard for review status
- Monitor user reviews and ratings
- Track download statistics

### **Updates**

- Use same process to upload new versions
- Increment version number in manifest.json
- Update changelog in store listing

### **Support**

- Respond to user reviews
- Address bug reports
- Update privacy policy if needed

---

## **🎯 Success Tips**

1. **Clear Screenshots**: Show the extension in action
2. **Compelling Description**: Highlight key benefits
3. **Privacy Policy**: Be transparent about data usage
4. **Test Thoroughly**: Ensure extension works on various sites
5. **User Feedback**: Be responsive to reviews and feedback

---

## **📁 Files Ready for Upload**

✅ **Package**: `chrome-store-package.zip`
✅ **Icons**: All required sizes included
✅ **Manifest**: V3 compliant
✅ **Source Code**: Available on GitHub

**Ready to upload! 🚀**
