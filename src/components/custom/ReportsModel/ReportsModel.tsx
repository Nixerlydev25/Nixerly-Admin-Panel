'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export type ReportCategory =
  | 'HARASSMENT'
  | 'SPAM'
  | 'INAPPROPRIATE_CONTENT'
  | 'FRAUD'
  | 'FAKE_PROFILE'
  | 'HATE_SPEECH'
  | 'VIOLENCE'
  | 'INTELLECTUAL_PROPERTY'
  | 'IMPERSONATION'
  | 'OTHER';

export type ReportStatus = 'PENDING' | 'RESOLVED' | 'REJECTED' | 'UNDER_REVIEW';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: 'worker' | 'business';
  targetName: string;
}

export function ReportModal({
  isOpen,
  onClose,
  targetId,
  targetType,
  targetName,
}: ReportModalProps) {
  const [category, setCategory] = useState<ReportCategory>('OTHER');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // In a real implementation, this would be a server action or API call
      // For demo purposes, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful submission
      setIsSuccess(true);
      setIsSubmitting(false);

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setCategory('OTHER');
        setReason('');
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      setError(
        'An error occurred while submitting your report. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setCategory('OTHER');
      setReason('');
      setIsSuccess(false);
      setError(null);
      onClose();
    }
  };

  const categoryLabels: Record<ReportCategory, string> = {
    HARASSMENT: 'Harassment or Bullying',
    SPAM: 'Spam or Misleading Content',
    INAPPROPRIATE_CONTENT: 'Inappropriate Content',
    FRAUD: 'Fraud or Scam',
    FAKE_PROFILE: 'Fake Profile',
    HATE_SPEECH: 'Hate Speech',
    VIOLENCE: 'Violence or Threats',
    INTELLECTUAL_PROPERTY: 'Intellectual Property Violation',
    IMPERSONATION: 'Impersonation',
    OTHER: 'Other Issue',
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Report {targetType === 'worker' ? 'User' : 'Business'}
          </DialogTitle>
          <DialogDescription>
            Report inappropriate behavior or content from {targetName}. Your
            report will be reviewed by our team.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">
                Report Submitted
              </AlertTitle>
              <AlertDescription className="text-green-700">
                Thank you for your report. Our team will review it as soon as
                possible.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="mb-3 text-sm font-medium">
                  What are you reporting?
                </h3>
                <RadioGroup
                  value={category}
                  onValueChange={(value: ReportCategory) => setCategory(value)}
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={value}
                          id={`category-${value}`}
                        />
                        <Label
                          htmlFor={`category-${value}`}
                          className="text-sm"
                        >
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Additional details</Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide specific details about your report..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="min-h-[120px]"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !reason.trim()}>
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
