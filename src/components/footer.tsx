// components/Footer.tsx ("use client")
"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/app/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>{t("footerRights")}</p>
        <Separator className="my-4" />
        <div className="space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link">{t("linkedin")}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("confirmOpen")}</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>
                  {t("cancel")}
                </Button>
                <Button asChild>
                  <a
                    href="https://www.linkedin.com/in/tr%E1%BA%A7n-ph%C6%B0%E1%BB%9Bc-thi%E1%BB%87n-zero-90ba9a329/" // Thay bằng link LinkedIn thật
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("ok")}
                  </a>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link">{t("github")}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("confirmOpen")}</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>
                  {t("cancel")}
                </Button>
                <Button asChild>
                  <a
                    href="https://github.com/ChickenSoup269" // Thay bằng link LinkedIn thật
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("ok")}
                  </a>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link">{t("email")}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("email")}</DialogTitle>
                <DialogDescription>
                  tranphuocthien2692003@gmail.com
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  )
}
