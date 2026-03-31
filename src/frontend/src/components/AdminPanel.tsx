import type { Request, Submission, Submission__1 } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  Inbox,
  Loader2,
  Lock,
  LogOut,
  MailOpen,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function EmptyState({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-4"
      data-ocid="admin.empty_state"
    >
      <Inbox size={48} className="text-[oklch(0.35_0_0)]" />
      <p className="font-body text-[oklch(0.45_0_0)] text-sm">
        No {label} yet.
      </p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3" data-ocid="admin.loading_state">
      {[1, 2, 3].map((i) => (
        <Skeleton
          key={i}
          className="h-12 w-full rounded-lg bg-[oklch(0.14_0.01_55)]"
        />
      ))}
    </div>
  );
}

export default function AdminPanel() {
  const { login, clear, isLoggingIn, isInitializing, identity } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();
  const isAuthenticated = !!identity;

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [contactData, setContactData] = useState<Submission__1[]>([]);
  const [newsletterData, setNewsletterData] = useState<Submission[]>([]);
  const [showRequestData, setShowRequestData] = useState<Request[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    if (!actor || !isAuthenticated) {
      setIsAdmin(null);
      return;
    }
    actor
      .isCallerAdmin()
      .then(setIsAdmin)
      .catch(() => setIsAdmin(false));
  }, [actor, isAuthenticated]);

  useEffect(() => {
    if (!actor || !isAdmin) return;
    setLoadingData(true);
    setDataError(null);
    Promise.all([
      actor.getAllContactSubmissions(),
      actor.getAllNewsletterSignups(),
      actor.getAllShowRequests(),
    ])
      .then(([contacts, newsletters, shows]) => {
        setContactData(contacts);
        setNewsletterData(newsletters);
        setShowRequestData(shows);
      })
      .catch(() => setDataError("Failed to load data. Please try again."))
      .finally(() => setLoadingData(false));
  }, [actor, isAdmin]);

  const isLoading =
    isInitializing || isFetching || (isAdmin === null && isAuthenticated);

  return (
    <div
      className="min-h-screen font-body"
      style={{ background: "oklch(0.085 0 0)" }}
    >
      {/* Header */}
      <header
        className="border-b border-[rgba(201,162,74,0.15)] px-4 sm:px-8 py-4 flex items-center justify-between"
        style={{ background: "oklch(0.10 0.015 55)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border-2 border-[oklch(0.70_0.12_75)] flex items-center justify-center">
            <span className="text-[oklch(0.70_0.12_75)] font-display font-bold text-sm tracking-widest">
              DG
            </span>
          </div>
          <div>
            <p className="font-display font-bold text-[oklch(0.88_0_0)] text-base tracking-[0.12em] uppercase">
              Drew Green
            </p>
            <p className="text-[oklch(0.45_0_0)] text-xs tracking-wider">
              Admin Panel
            </p>
          </div>
        </div>
        {isAuthenticated && (
          <Button
            variant="outline"
            size="sm"
            onClick={clear}
            className="border-[rgba(201,162,74,0.3)] text-[oklch(0.60_0_0)] hover:text-[oklch(0.88_0_0)] hover:border-[oklch(0.70_0.12_75)] gap-2"
            data-ocid="admin.close_button"
          >
            <LogOut size={14} />
            Log Out
          </Button>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        {/* Not logged in */}
        {!isAuthenticated && !isInitializing && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full border-2 border-[oklch(0.70_0.12_75/0.4)] flex items-center justify-center mx-auto mb-6"
                style={{ background: "oklch(0.12 0.015 55)" }}
              >
                <Lock size={32} className="text-[oklch(0.70_0.12_75)]" />
              </div>
              <h1 className="font-display text-3xl font-bold text-[oklch(0.88_0_0)] tracking-[0.1em] uppercase mb-3">
                Admin Access
              </h1>
              <p className="font-body text-[oklch(0.50_0_0)] max-w-sm mx-auto">
                Sign in with your Internet Identity to access the admin
                dashboard.
              </p>
            </div>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="px-8 py-3 text-sm tracking-widest uppercase font-semibold gap-2"
              style={{
                background: "oklch(0.70 0.12 75)",
                color: "oklch(0.085 0 0)",
              }}
              data-ocid="admin.primary_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        )}

        {/* Loading */}
        {(isInitializing || isLoading) && isAuthenticated && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div
              className="flex flex-col items-center gap-4"
              data-ocid="admin.loading_state"
            >
              <Loader2
                size={36}
                className="text-[oklch(0.70_0.12_75)] animate-spin"
              />
              <p className="font-body text-[oklch(0.45_0_0)] text-sm">
                Verifying access...
              </p>
            </div>
          </div>
        )}

        {/* Access Denied */}
        {isAuthenticated && !isLoading && isAdmin === false && (
          <div
            className="flex flex-col items-center justify-center min-h-[60vh] gap-6"
            data-ocid="admin.error_state"
          >
            <div
              className="w-20 h-20 rounded-full border-2 border-red-500/30 flex items-center justify-center mx-auto"
              style={{ background: "oklch(0.12 0.015 55)" }}
            >
              <Lock size={32} className="text-red-400" />
            </div>
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold text-[oklch(0.88_0_0)] tracking-[0.1em] uppercase mb-2">
                Access Denied
              </h2>
              <p className="font-body text-[oklch(0.50_0_0)] max-w-sm mx-auto">
                Your account does not have admin privileges.
              </p>
            </div>
          </div>
        )}

        {/* Admin dashboard */}
        {isAuthenticated && !isLoading && isAdmin === true && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck size={22} className="text-[oklch(0.70_0.12_75)]" />
              <h1 className="font-display text-2xl font-bold text-[oklch(0.88_0_0)] tracking-[0.1em] uppercase">
                Submissions
              </h1>
              <div className="w-8 h-0.5 bg-[oklch(0.70_0.12_75/0.4)] ml-2" />
            </div>

            {dataError && (
              <div
                className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm"
                data-ocid="admin.error_state"
              >
                {dataError}
              </div>
            )}

            <Tabs defaultValue="contact" className="w-full">
              <TabsList
                className="mb-6 p-1 rounded-xl border border-[rgba(201,162,74,0.15)] gap-1"
                style={{ background: "oklch(0.10 0.015 55)" }}
              >
                <TabsTrigger
                  value="contact"
                  className="data-[state=active]:bg-[oklch(0.70_0.12_75)] data-[state=active]:text-[oklch(0.085_0_0)] rounded-lg text-[oklch(0.55_0_0)] font-semibold tracking-wide text-xs gap-2 px-4"
                  data-ocid="admin.tab"
                >
                  <MailOpen size={13} />
                  Contact & Booking
                  <Badge className="ml-1 bg-[oklch(0.18_0.02_55)] text-[oklch(0.60_0_0)] border-0 text-xs px-1.5">
                    {contactData.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="newsletter"
                  className="data-[state=active]:bg-[oklch(0.70_0.12_75)] data-[state=active]:text-[oklch(0.085_0_0)] rounded-lg text-[oklch(0.55_0_0)] font-semibold tracking-wide text-xs gap-2 px-4"
                  data-ocid="admin.tab"
                >
                  <Inbox size={13} />
                  Newsletter
                  <Badge className="ml-1 bg-[oklch(0.18_0.02_55)] text-[oklch(0.60_0_0)] border-0 text-xs px-1.5">
                    {newsletterData.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="shows"
                  className="data-[state=active]:bg-[oklch(0.70_0.12_75)] data-[state=active]:text-[oklch(0.085_0_0)] rounded-lg text-[oklch(0.55_0_0)] font-semibold tracking-wide text-xs gap-2 px-4"
                  data-ocid="admin.tab"
                >
                  <MapPin size={13} />
                  Show Requests
                  <Badge className="ml-1 bg-[oklch(0.18_0.02_55)] text-[oklch(0.60_0_0)] border-0 text-xs px-1.5">
                    {showRequestData.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              {/* Contact & Booking */}
              <TabsContent value="contact">
                {loadingData ? (
                  <LoadingSkeleton />
                ) : contactData.length === 0 ? (
                  <EmptyState label="contact submissions" />
                ) : (
                  <div
                    className="rounded-xl border border-[rgba(201,162,74,0.12)] overflow-hidden"
                    style={{ background: "oklch(0.10 0.015 55)" }}
                    data-ocid="admin.table"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[rgba(201,162,74,0.12)] hover:bg-transparent">
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Name
                          </TableHead>
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Email
                          </TableHead>
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Type
                          </TableHead>
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Message
                          </TableHead>
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Date
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contactData.map((row, i) => (
                          <TableRow
                            key={String(row.timestamp) + row.email}
                            className="border-[rgba(201,162,74,0.08)] hover:bg-[oklch(0.13_0.02_55)]"
                            data-ocid={`admin.row.${i + 1}`}
                          >
                            <TableCell className="text-[oklch(0.85_0_0)] font-medium text-sm">
                              {row.name}
                            </TableCell>
                            <TableCell className="text-[oklch(0.60_0_0)] text-sm">
                              {row.email}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className="text-xs font-semibold"
                                style={{
                                  background:
                                    row.inquiryType === "booking"
                                      ? "oklch(0.70 0.12 75 / 0.15)"
                                      : "oklch(0.60 0 0 / 0.1)",
                                  color:
                                    row.inquiryType === "booking"
                                      ? "oklch(0.70 0.12 75)"
                                      : "oklch(0.60 0 0)",
                                  border:
                                    row.inquiryType === "booking"
                                      ? "1px solid oklch(0.70 0.12 75 / 0.3)"
                                      : "1px solid oklch(0.40 0 0 / 0.3)",
                                }}
                              >
                                {row.inquiryType}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-[oklch(0.55_0_0)] text-sm max-w-xs truncate">
                              {row.message}
                            </TableCell>
                            <TableCell className="text-[oklch(0.45_0_0)] text-xs whitespace-nowrap">
                              {formatTimestamp(row.timestamp)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              {/* Newsletter */}
              <TabsContent value="newsletter">
                {loadingData ? (
                  <LoadingSkeleton />
                ) : newsletterData.length === 0 ? (
                  <EmptyState label="newsletter signups" />
                ) : (
                  <div
                    className="rounded-xl border border-[rgba(201,162,74,0.12)] overflow-hidden"
                    style={{ background: "oklch(0.10 0.015 55)" }}
                    data-ocid="admin.table"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[rgba(201,162,74,0.12)] hover:bg-transparent">
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Name
                          </TableHead>
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Email
                          </TableHead>
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Date
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {newsletterData.map((row, i) => (
                          <TableRow
                            key={String(row.timestamp) + row.email}
                            className="border-[rgba(201,162,74,0.08)] hover:bg-[oklch(0.13_0.02_55)]"
                            data-ocid={`admin.row.${i + 1}`}
                          >
                            <TableCell className="text-[oklch(0.85_0_0)] font-medium text-sm">
                              {row.name}
                            </TableCell>
                            <TableCell className="text-[oklch(0.60_0_0)] text-sm">
                              {row.email}
                            </TableCell>
                            <TableCell className="text-[oklch(0.45_0_0)] text-xs">
                              {formatTimestamp(row.timestamp)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              {/* Show Requests */}
              <TabsContent value="shows">
                {loadingData ? (
                  <LoadingSkeleton />
                ) : showRequestData.length === 0 ? (
                  <EmptyState label="show requests" />
                ) : (
                  <div
                    className="rounded-xl border border-[rgba(201,162,74,0.12)] overflow-hidden"
                    style={{ background: "oklch(0.10 0.015 55)" }}
                    data-ocid="admin.table"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[rgba(201,162,74,0.12)] hover:bg-transparent">
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Name
                          </TableHead>
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Email
                          </TableHead>
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Location
                          </TableHead>
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Message
                          </TableHead>
                          <TableHead className="text-[oklch(0.70_0.12_75)] font-semibold text-xs tracking-widest uppercase">
                            Date
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {showRequestData.map((row, i) => (
                          <TableRow
                            key={String(row.timestamp) + row.email}
                            className="border-[rgba(201,162,74,0.08)] hover:bg-[oklch(0.13_0.02_55)]"
                            data-ocid={`admin.row.${i + 1}`}
                          >
                            <TableCell className="text-[oklch(0.85_0_0)] font-medium text-sm">
                              {row.name}
                            </TableCell>
                            <TableCell className="text-[oklch(0.60_0_0)] text-sm">
                              {row.email}
                            </TableCell>
                            <TableCell className="text-[oklch(0.60_0_0)] text-sm">
                              {[row.city, row.state, row.country]
                                .filter(Boolean)
                                .join(", ")}
                            </TableCell>
                            <TableCell className="text-[oklch(0.55_0_0)] text-sm max-w-xs truncate">
                              {row.message}
                            </TableCell>
                            <TableCell className="text-[oklch(0.45_0_0)] text-xs whitespace-nowrap">
                              {formatTimestamp(row.timestamp)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
}
