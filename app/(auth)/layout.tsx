interface Props {
  children: React.ReactNode;
}

export function AuthLayout({ children }: Props) {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
}
