
            For serious operators who demand results.
          </p>
6">25 Weapons.<br />Zero Excuses.</h2>
            <p className="text-2xl text-zinc-400 max-w-2xl mx-auto">
              Battle-tested AI automations built for operators who execute at the highest level.
            </p>
          </div>

          <Suspense fallback={
            <div className="text-center py-24 text-zinc-500">Loading your premium skills...</div>
          }>
            <SkillsData />
          </Suspense>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-zinc-950 py-24 text-center border-t border-zinc-900">
        <p className="text-4xl font-light mb-10">Stop playing small.<br />Claim what belongs to you.</p>
        <a href="#skills" className="inline-block bg-white text-black px-20 py-7 rounded-2xl text-3xl font-bold hover:bg-violet-600 hover:text-white transition-all">
          OPEN THE VAULT
        </a>
      </div>
