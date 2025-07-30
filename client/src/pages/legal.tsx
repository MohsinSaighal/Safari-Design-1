import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { fadeInUp } from '@/lib/animations';
import { ArrowLeft, FileText, Shield, Cookie } from 'lucide-react';

export default function Legal() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-neon-cyan hover:text-neon-cyan/80">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <h1 className="font-space font-bold text-4xl lg:text-5xl mb-4">
            Legal <span className="text-neon-cyan">Information</span>
          </h1>
          <p className="text-xl text-gray-400">
            Important legal documents and policies for SafariQ platform users.
          </p>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <Card className="bg-gray-800 border-neon-cyan/30">
            <CardHeader>
              <CardTitle className="text-neon-cyan">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="border-neon-violet text-neon-violet hover:bg-neon-violet/10 justify-start"
                  onClick={() => document.getElementById('terms')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <FileText size={16} className="mr-2" />
                  Terms & Conditions
                </Button>
                <Button
                  variant="outline"
                  className="border-neon-green text-neon-green hover:bg-neon-green/10 justify-start"
                  onClick={() => document.getElementById('privacy')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Shield size={16} className="mr-2" />
                  Privacy Policy
                </Button>
                <Button
                  variant="outline"
                  className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 justify-start"
                  onClick={() => document.getElementById('cookies')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Cookie size={16} className="mr-2" />
                  Cookie Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Terms & Conditions */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-12"
          id="terms"
        >
          <Card className="bg-gray-800 border-neon-violet/30">
            <CardHeader>
              <CardTitle className="text-neon-violet flex items-center">
                <FileText size={24} className="mr-2" />
                Terms & Conditions
              </CardTitle>
              <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <section>
                <h3 className="text-xl font-bold mb-3 text-white">1. Acceptance of Terms</h3>
                <p>
                  By accessing and using SafariQ ("the Platform"), you agree to be bound by these Terms & Conditions. 
                  SafariQ is a Web3 travel platform that connects traditional travel services with blockchain technology, 
                  including SED tokens and NFT rewards.
                </p>
              </section>

              <Separator className="bg-gray-700" />

              <section>
                <h3 className="text-xl font-bold mb-3 text-white">2. Platform Services</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Travel booking aggregation and AI-powered recommendations</li>
                  <li>SED token rewards system on Polygon blockchain</li>
                  <li>SafariQ Key NFT minting and utility features</li>
                  <li>Referral program with token-based incentives</li>
                  <li>Community features and governance participation</li>
                </ul>
              </section>

              <Separator className="bg-gray-700" />

              <section>
                <h3 className="text-xl font-bold mb-3 text-white">3. Web3 and Blockchain Disclaimer</h3>
                <p>
                  SafariQ utilizes blockchain technology including smart contracts, NFTs, and cryptocurrency tokens. 
                  Users acknowledge the inherent risks associated with blockchain technology, including but not limited to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Volatility in token values</li>
                  <li>Smart contract vulnerabilities</li>
                  <li>Network congestion and gas fees</li>
                  <li>Irreversible blockchain transactions</li>
                </ul>
              </section>

              <Separator className="bg-gray-700" />

              <section>
                <h3 className="text-xl font-bold mb-3 text-white">4. User Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain security of wallet private keys and seed phrases</li>
                  <li>Verify all transaction details before confirmation</li>
                  <li>Comply with applicable laws and regulations in your jurisdiction</li>
                  <li>Use the platform responsibly and ethically</li>
                </ul>
              </section>

              <Separator className="bg-gray-700" />

              <section>
                <h3 className="text-xl font-bold mb-3 text-white">5. Limitation of Liability</h3>
                <p>
                  SafariQ is provided "as is" without warranties. We are not liable for any losses, damages, or issues 
                  arising from platform use, including but not limited to technical failures, security breaches, or 
                  market volatility affecting token values.
                </p>
              </section>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Policy */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-12"
          id="privacy"
        >
          <Card className="bg-gray-800 border-neon-green/30">
            <CardHeader>
              <CardTitle className="text-neon-green flex items-center">
                <Shield size={24} className="mr-2" />
                Privacy Policy
              </CardTitle>
              <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <section>
                <h3 className="text-xl font-bold mb-3 text-white">Information We Collect</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Information:</strong> Name, email, country, and optional wallet address</li>
                  <li><strong>Usage Data:</strong> Platform interactions, referral activities, and travel preferences</li>
                  <li><strong>Blockchain Data:</strong> Public wallet addresses and transaction histories</li>
                  <li><strong>Technical Data:</strong> IP addresses, browser information, and device identifiers</li>
                </ul>
              </section>

              <Separator className="bg-gray-700" />

              <section>
                <h3 className="text-xl font-bold mb-3 text-white">How We Use Your Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve our travel and Web3 services</li>
                  <li>Process referrals and distribute SED token rewards</li>
                  <li>Send important updates about your account and platform changes</li>
                  <li>Comply with legal requirements and prevent fraud</li>
                  <li>Analyze platform usage to enhance user experience</li>
                </ul>
              </section>

              <Separator className="bg-gray-700" />

              <section>
                <h3 className="text-xl font-bold mb-3 text-white">Data Security</h3>
                <p>
                  We implement industry-standard security measures to protect your personal information. However, 
                  no method of transmission over the internet is 100% secure. We encourage users to maintain strong 
                  security practices, especially regarding cryptocurrency wallets and private keys.
                </p>
              </section>

              <Separator className="bg-gray-700" />

              <section>
                <h3 className="text-xl font-bold mb-3 text-white">Third-Party Services</h3>
                <p>
                  SafariQ integrates with various travel partners and blockchain services. We may share necessary 
                  information with these partners to provide our services, but we do not sell your personal data 
                  to third parties for marketing purposes.
                </p>
              </section>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cookie Policy */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-12"
          id="cookies"
        >
          <Card className="bg-gray-800 border-neon-cyan/30">
            <CardHeader>
              <CardTitle className="text-neon-cyan flex items-center">
                <Cookie size={24} className="mr-2" />
                Cookie Policy
              </CardTitle>
              <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <section>
                <h3 className="text-xl font-bold mb-3 text-white">What Are Cookies</h3>
                <p>
                  Cookies are small text files stored on your device when you visit our website. They help us 
                  provide a better user experience by remembering your preferences and enabling certain platform features.
                </p>
              </section>

              <Separator className="bg-gray-700" />

              <section>
                <h3 className="text-xl font-bold mb-3 text-white">Types of Cookies We Use</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-neon-cyan">Essential Cookies</h4>
                    <p>Required for basic platform functionality, including user authentication and security.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-neon-violet">Analytics Cookies</h4>
                    <p>Help us understand how users interact with our platform to improve services.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-neon-green">Preference Cookies</h4>
                    <p>Remember your settings and preferences for a personalized experience.</p>
                  </div>
                </div>
              </section>

              <Separator className="bg-gray-700" />

              <section>
                <h3 className="text-xl font-bold mb-3 text-white">Managing Cookies</h3>
                <p>
                  You can control cookies through your browser settings. However, disabling certain cookies may 
                  affect platform functionality. We use privacy-friendly analytics tools that respect user privacy 
                  and comply with data protection regulations.
                </p>
              </section>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center"
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Questions About Our Legal Policies?</h3>
              <p className="text-gray-400 mb-6">
                If you have any questions about these terms, privacy policy, or cookie usage, please contact us.
              </p>
              <Button className="bg-neon-cyan text-black hover:bg-neon-cyan/90">
                Contact Legal Team
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
